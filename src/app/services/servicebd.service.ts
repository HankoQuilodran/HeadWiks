import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

//importar clases
import {User} from '../classes/user'
import {Annotation} from '../classes/annotation'
import {Entry} from '../classes/entry'
import {Role} from '../classes/role'
import {Status} from '../classes/status'
import {Tag} from '../classes/tag'
import {TagEntry} from '../classes/tag-entry'


@Injectable({
  providedIn: 'root'
})

export class ServicebdService {
  //aqui variables
  public database!: SQLiteObject;

  // crear tablas
  tablaUser: string = 'CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY autoincrement, role_id INTEGER NOT NULL, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, profile_picture BLOB, register_date TEXT NOT NULL, FOREIGN KEY ("role_id") REFERENCES "role"("role_id"));';

  tablaRole: string = 'CREATE TABLE IF NOT EXISTS role(role_id INTEGER PRIMARY KEY, role_name TEXT NOT NULL);';

  tablaStatus: string = 'CREATE TABLE IF NOT EXISTS status(status_id INTEGER PRIMARY KEY, status_description TEXT);';

  tablaLike: string = 'CREATE TABLE IF NOT EXISTS like(like_id INTEGER PRIMARY KEY autoincrement, user_id INTEGER, entry_id INTEGER, FOREIGN KEY("user_id") REFERENCES"user"("user_id"), FOREIGN KEY("entry_id") REFERENCES"entry"("entry_id"));';

  tablaFollow: string = 'CREATE TABLE IF NOT EXIST follow(follow_id INTEGER PRIMARY KEY autoincrement, user_id_principal INTEGER, user_id_follower INTEGER, FOREIGN KEY ("user_id_principal") REFERENCES"user"("user_id"), FOREIGN KEY ("user_id_follower") REFERENCES"tablaUser"("user_id"));';


  tablaEntry: string ='CREATE TABLE IF NOT EXISTS entry(entry_id INTEGER PRIMARY KEY autoincrement, user_id INTEGER NOT NULL, status_id INTEGER NOT NULL,  entry_title TEXT NOT NULL, entry_content TEXT NOT NULL, briefing TEXT NOT NULL, image TEXT, sources TEXT, creation_date TEXT NOT NULL, ban_date TEXT , reason TEXT, FOREIGN KEY ("user_id") REFERENCES "user"("user_id"), FOREIGN KEY ("status_id") REFERENCES "status"("status_id") );';

  //tablaTag: string ='CREATE TABLE IF NOT EXISTS tag(tag_id INTEGER PRIMARY KEY autoincrement, tag_description TEXT);';

  //tablaTagEntry: string = "CREATE TABLE IF NOT EXISTS tag_entry(tag_entry_id INTEGER PRIMARY KEY autoincrement, entry_id INTEGER NOT NULL, tag_id INTEGER NOT NULL, FOREIGN KEY('entry_id') REFERENCES'entry'('entry_id'), FOREIGN KEY('tag_id') REFERENCES'tag'('tag_id'));";

  tablaAnnotation: string = 'CREATE TABLE IF NOT EXISTS annotation(annotation_id INTEGER PRIMARY KEY autoincrement, entry_id INTEGER NOT NULL, user_id INTEGER NOT NULL, status_id INTEGER NOT NULL, annotation_title TEXT,  annotation_content TEXT, ban_date TEXT, reason TEXT, FOREIGN KEY("entry_id") REFERENCES "entry"("entry_id"), FOREIGN KEY("user_id") REFERENCES"user"("user_id"), FOREIGN KEY("status_id") REFERENCES"status"("status_id") );';

  //insertar defaults

  registroUser: string = "INSERT or IGNORE INTO user(user_id, role_id, username, email, password, register_date) VALUES (1, 2, 'HANKO', 'HANKO@MAIL.COM', '123', '00/00/00' );";

  registroRole: string = "INSERT or IGNORE INTO role(role_id, role_name) VALUES (1, 'usuario'), (2, 'moderador');";

  registroStatus: string = "INSERT OR IGNORE INTO status(status_id, status_description) VALUES (1, 'active'), (2, 'inactive');";

  registroLike: string = "INSERT or IGNORE INTO like(like_id, user_id, entry_id) VALUES(1, 1, 1);";

  registroFollow: string = "INSERT or IGNORE INTO follow(follow_id, user_id_principal, user_id_follower) VALUES(1, 1, 1);";

  registroEntry: string = "INSERT or IGNORE INTO entry(entry_id, user_id, status_id, entry_title, entry_content, briefing, image, sources, creation_date, ban_date, reason ) VALUES(1, 1, 1, 'ENTRYTITLE', 'ENTRYCONTENT', 'BRIEFING', '/assets/PlaceHolders/mountain_PH.png', 'SOURCES', '00/00/00', '00/00/00', 'REASON');";

  registroTag: string = "INSERT or IGNORE INTO tag(tag_id, tag_description) VALUES(1, 'TAGDESCRIPTION');";

  registroTagEntry: string = "INSERT or IGNORE INTO tag_entry(tag_entry_id, entry_id, tag_id) VALUES(1, 1, 1);";

  registroAnnotation: string = "INSERT or IGNORE INTO annotation(annotation_id, entry_id, user_id, status_id,  annotation_title ,annotation_content, ban_date,reason ) VALUES(1, 1, 1, 1, 'ANNOTATIONTITLE',  'ANNOTATIONCONTENT', '00/00/00', 'REASON');";

  //variables de observables

  listaUser = new BehaviorSubject([]);

  listaRole = new BehaviorSubject([]);

  listaLike = new BehaviorSubject([]);

  listaFollow = new BehaviorSubject([]);

  listaEntry = new BehaviorSubject([]);

  listaTag = new BehaviorSubject([]);

  listaTagEntry = new BehaviorSubject([]);

  listaAnnotation = new BehaviorSubject([]);

  //observable del estado de la base de datos

  public isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 
    this.createBD();
  }

  async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  private usuarioActual = new BehaviorSubject<User>({
    user_id: 0,
    role_id: 0,
    email: "",
    password: "",
    username: "",
    profile_picture: "",
    register_date: ""
  });

  private entradaActual = new BehaviorSubject<Entry>({
    entry_id: 0,
    user_id: 0,
    status_id: 0,
    entry_title: "",
    entry_content: "",
    briefing: "",
    image: "",
    sources: "",
    creation_date: "",
    ban_date: "",
    reason: ""
  });

  private userBuscado = new BehaviorSubject<User>({
    user_id: 0,
    role_id: 0,
    email: "",
    password: "",
    username: "",
    profile_picture: "",
    register_date: ""
  });

  //metodos para manipular los observables
  fetchUsers(): Observable<User[]>{
    return this.listaUser.asObservable();
  }

  fetchEntry(): Observable<Entry[]>{
    return this.listaEntry.asObservable();
  }

  fetchAnnotations(): Observable<Annotation[]>{
    return this.listaAnnotation.asObservable();
  }

  fetchEntradaActual(): Observable<Entry>{
    return this.entradaActual.asObservable();
  }

  fetchUsuarioActual():Observable<User>{
    return this.usuarioActual.asObservable();
  }

  fetchUserBuscado():Observable<User>{
    return this.userBuscado.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }


  //función para crear la Base de Datos
  createBD(){
    //varificar si la plataforma esta disponible
    this.platform.ready().then(()=>{
      //crear la Base de Datos
      this.sqlite.create({
        name: 'entry.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        //capturar la conexion a la BD
        this.database = db;
        //llamamos a la función para crear las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      })
    })

  }



  async crearTablas(){
    try{
      //ejecuto la creación de Tablas

      await this.database.executeSql(this.tablaRole, []);
      await this.database.executeSql(this.tablaUser, []);

      await this.database.executeSql(this.tablaStatus, []);
      
      //await this.database.executeSql(this.tablaTagEntry, []);
      //await this.database.executeSql(this.tablaTag, []);
      try{
        await this.database.executeSql(this.tablaEntry, []);
      }catch(e){
        this.presentAlert('Creación de Tablas entradas', 'Error en crear tablas: ' + JSON.stringify(e));
      }

      try{
        await this.database.executeSql(this.tablaAnnotation, []);
      }catch(e){
        this.presentAlert('Creación de Tablas Anotaciones', 'Error en crear tablas: ' + JSON.stringify(e));
      }

      //-----ejecuto los insert por defecto en el caso que existan----

      await this.database.executeSql(this.registroRole, []);
      await this.database.executeSql(this.registroUser, []);
      await this.database.executeSql(this.registroStatus, []);

      //await this.database.executeSql(this.registroTag, []);
      //await this.database.executeSql(this.registroTagEntry, []);
      

      try{
        await this.database.executeSql(this.registroEntry, []);
      }catch(e){
        this.presentAlert('poblacion de entradas', 'Error en poblar las tablas: ' + JSON.stringify(e));
      }

      try{
        await this.database.executeSql(this.registroAnnotation, []);
      }catch(e){
        this.presentAlert('poblacion de anotaciones', 'Error en poblar las tablas: ' + JSON.stringify(e));
      }

      this.seleccionarUser();
      this.seleccionarEntry();
      //modifico el estado de la Base de Datos
      this.isDBReady.next(true);

    }catch(e){
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  seleccionarUser(){
    return this.database.executeSql('SELECT * FROM user', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: User[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            user_id: res.rows.item(i).user_id,
            role_id: res.rows.item(i).role_id,
            username: res.rows.item(i).username,
            email: res.rows.item(i).email,
            password: res.rows.item(i).password,
            profile_picture: res.rows.item(i).profile_picture,
            register_date: res.rows.item(i).register_date
          })
        }
        
       }
       //actualizar el observable
       this.listaUser.next(items as any);

    })
  }

  public LoginVerification(username:string, email:string, password:string) {
    return this.database.executeSql('SELECT * FROM user WHERE username = ? AND email = ? AND password = ?' ,[username, email, password])
    .then(res => {
      if(res.rows.length > 0) {
        let data: User = {
          user_id: res.rows.item(0).user_id,
          role_id: res.rows.item(0).role_id,
          username: res.rows.item(0).username,
          email: res.rows.item(0).email,
          password: res.rows.item(0).password,
          profile_picture: res.rows.item(0).profile_picture,
          register_date: res.rows.item(0).register_date
        };
        this.usuarioActual.next(data); 
      }      
    })
    .catch(error => {
      this.presentAlert('No user found', JSON.stringify(error));
    });
  }

  public EntradaActual(id:number){
    return this.database.executeSql('SELECT * FROM entry WHERE entry_id = ?', [id])
    .then(res => {
      if(res.rows.length > 0){
        let data: Entry = {
          entry_id: res.rows.item(0).entry_id,
          user_id: res.rows.item(0).user_id,
          status_id: res.rows.item(0),
          entry_title: res.rows.item(0).entry_title,
          entry_content: res.rows.item(0).entry_content,
          briefing: res.rows.item(0).briefing,
          image: res.rows.item(0).image,
          sources: res.rows.item(0).sources,
          creation_date: res.rows.item(0).creation_date,
          ban_date: res.rows.item(0).ban_date,
          reason: res.rows.item(0).reason,
        };
        this.entradaActual.next(data);
      }
    })
    .catch(error => {
      this.presentAlert('No entry found', JSON.stringify(error));
    });
  }


  seleccionarEntry(){
    return this.database.executeSql('SELECT * FROM entry', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Entry[] = [];
       //valido si trae al menos un registro
        if(res.rows.length > 0){
        //recorro mi resultado
          for(var i=0; i < res.rows.length; i++){
            //agrego los registros a mi lista
            items.push({
              user_id: res.rows.item(i).user_id,
              entry_id: res.rows.item(i).entry_id,
              status_id: res.rows.item(i).status_id,
              entry_title: res.rows.item(i).entry_title,
              entry_content: res.rows.item(i).entry_content,
              briefing: res.rows.item(i).briefing,
              image: res.rows.item(i).image,
              creation_date: res.rows.item(i).creation_date,
              ban_date: res.rows.item(i).ban_date,
              reason: res.rows.item(i).reason,
              sources: res.rows.item(i).sources
            })
          }
        }
       //actualizar el observable
       this.listaEntry.next(items as any);

    })
  }

  seleccionarAnnotation(entryId: number){
    return this.database.executeSql('SELECT * FROM annotation WHERE entry_id = ?', [entryId]).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Annotation[] = [];
       //valido si trae al menos un registro
        if(res.rows.length > 0){
        //recorro mi resultado
          for(var i=0; i < res.rows.length; i++){
            //agrego los registros a mi lista
            items.push({
              annotation_id: res.rows.item(i).annotation_id,
              user_id: res.rows.item(i).user_id,
              entry_id: res.rows.item(i).entry_id,
              status_id: res.rows.item(i).status_id,
              annotation_title: res.rows.item(i).entry_title,
              annotation_content: res.rows.item(i).entry_content,
              ban_date: res.rows.item(i).ban_date,
              reason: res.rows.item(i).reason
            })
          }
        }
       //actualizar el observable
       this.listaAnnotation.next(items as any);

    })
  }


  public buscarUser(id:number) {
    return this.database.executeSql('SELECT * FROM user WHERE user_id = ?' ,[id])
    .then(res => {
      if(res.rows.length > 0) {
        let data: User = {
          user_id: res.rows.item(0).user_id,
          role_id: res.rows.item(0).role_id,
          username: res.rows.item(0).username,
          email: res.rows.item(0).email,
          password: res.rows.item(0).password,
          profile_picture: res.rows.item(0).profile_picture,
          register_date: res.rows.item(0).register_date
        };
        this.userBuscado.next(data); 
      }      
    })
    .catch(error => {
      this.presentAlert('No user found', JSON.stringify(error));
    });
  }

  public actualizarUserLocal(id:number) {
    return this.database.executeSql('SELECT * FROM user WHERE user_id = ?' ,[id])
    .then(res => {
      if(res.rows.length > 0) {
        let data: User = {
          user_id: res.rows.item(0).user_id,
          role_id: res.rows.item(0).role_id,
          username: res.rows.item(0).username,
          email: res.rows.item(0).email,
          password: res.rows.item(0).password,
          profile_picture: res.rows.item(0).profile_picture,
          register_date: res.rows.item(0).register_date
        };
        this.usuarioActual.next(data); 
      }      
    })
    .catch(error => {
      this.presentAlert('No user found', JSON.stringify(error));
    });
  }


  //DELETE
  eliminarUser(id:number){
    return this.database.executeSql('DELETE FROM user WHERE user_id = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","User Deleted");
      this.seleccionarUser();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  eliminarEntry(id:number){
    return this.database.executeSql('DELETE FROM entry WHERE entry_id = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","entry Deleted");
      this.seleccionarUser();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  eliminarAnnotation(id:number){
    return this.database.executeSql('DELETE FROM annotation WHERE annotation_id = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Annotation Deleted");
      this.seleccionarUser();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  
  // MODIFICAR
  modificarUserUsername(id:string, username:string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE user SET username = ? WHERE user_id = ?',[username,id]).then(res=>{
      this.presentAlert("Modificado","User username Modified");
      this.seleccionarUser();
    }).catch(e=>{
      this.presentAlert('Error al Modificar Username', 'Error: ' + JSON.stringify(e));
    })

  }
 
  modificarUserImage(id:string, profile_picture:any){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE user SET profile_picture = ? WHERE user_id = ?',[profile_picture,id]).then(res=>{
      this.presentAlert("Modificado","User profile picture Modified");
      this.seleccionarUser();
    }).catch(e=>{
      this.presentAlert('Error al Modificar imagen', 'Error: ' + JSON.stringify(e));
    })
  }

  modificarUserRole(id:string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE user SET role_id = 2 WHERE user_id = ?',[id]).then(res=>{
      this.presentAlert("Modificado","User profile picture Modified");
      this.seleccionarUser();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }

  // INSERT
  insertarUser(username:string, email:string, password:string ){
    return this.database.executeSql('INSERT INTO user(role_id, username, email, password, register_date) VALUES (1, ?,?,?, ?)',[username, email, password, new Date().toString]).then(res=>{
      this.presentAlert("Insertar","User Registered");
      this.seleccionarUser();
    }).catch(e=>{
      this.presentAlert('Insertar usuario', 'Error: ' + JSON.stringify(e));
    })
  }

  insertarEntry(user_id:number,entry_title:string, entry_content:string, briefing:string, image:any, sources:string) {
    return this.database.executeSql('INSERT INTO entry(user_id,status_id, entry_title, entry_content, briefing, image, sources, creation_date) VALUES (?,1,?,?,?,?,?,Date("now"))',[user_id, entry_title, entry_content, briefing, image, sources]).then(res=>{
      this.presentAlert("Insertar","Entry Registered");
      this.presentAlert(entry_title, briefing);
      this.seleccionarEntry();
    }).catch(e=>{
      this.presentAlert('Insertar entrada', 'Error: ' + JSON.stringify(e));
    })
  }

  insertarAnnotation(entry_id:number, user_id:number, annotation_title:string, annotation_content:string  ){
    return this.database.executeSql('INSERT INTO annotation(entry_id, user_id, status_id ,annotation_title, annotation_content) VALUES (?,?,1,?,?)',[entry_id, user_id, annotation_title, annotation_content]).then(res=>{
      this.presentAlert("Insertar","annotation Registered");
      this.seleccionarEntry();
    }).catch(e=>{
      this.presentAlert('Insertar anotacion', 'Error: ' + JSON.stringify(e));
    })
  }


}