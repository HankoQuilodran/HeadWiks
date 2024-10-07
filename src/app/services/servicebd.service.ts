import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServicebdService {
  //aqui variables
  public database!: SQLiteObject;

  // crear tablas
  tablaUser: string = 'CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY autoincrement, role_id INTEGER, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, profile_picture TEXT, register_date TEXT, FOREIGN KEY ("role_id") REFERENCES "tablaRole"("role_id"));';

  tablaRole: string = 'CREATE TABLE IF NOT EXIST role(role_id INTEGER PRIMARY KEY autoincrement, role_name TEXT)';

  tablaLike: string = 'CREATE TABLE IF NOT EXIST like(like_id INTEGER PRIMARY KEY autoincrement, user_id INTEGER, entry_id INTEGER, FOREIGN KEY("user_id") REFERENCES"tablaUser"("user_id"), FOREIGN KEY("entry_id") REFERENCES"tablaEntry"("entry_id"));';

  tablaFollow: string = 'CREATE TABLE IF NOT EXIST follow(follow_id INTEGER PRIMARY KEY autoincrement, user_id_principal INTEGER, user_id_follower INTEGER, FOREIGN KEY ("user_id_principal") REFERENCES"tablaUser"("user_id"), FOREIGN KEY ("user_id_follower") REFERENCES"tablaUser"("user_id"));';

  tablaEntry: string ='CREATE TABLE IF NOT EXISTS entry(entry_id INTEGER PRIMARY KEY autoincrement, user_id INTEGER NOT NULL, entry_title TEXT NOT NULL, entry_content TEXT NOT NULL, briefing TEXT NOT NULL, image TEXT, s0ources TEXT, creation_date TEXT NOT NULL, ban_date TEXT , reason TEXT, status_id TEXT, FOREIGN KEY ("user_id") REFERENCES "tablaUser"("user_id"), FOREIGN KEY("status_id") REFERENCES"tablaStatus"("status_id"));';

  tablaStatus: string = "CREATE TABLE IF NO EXISTS status(status_id) PRIMARY KEY increment, status_description );";

  tablaTag: string ="CREATE TABLE IF NOT EXISTS tag(tag_entry_id INTEGER PRIMARY KEY autoincrement, tag_description TEXT);";

  tablaTagEntry: string = "CREATE TABLE IF NOT EXIST tag_entry(tag_entry_id INTEGER PRIMARY KEY autoincrement, entry_id INTEGER NOT NULL, tag_id INTEGER NOT NULL, FOREIGN KEY(entry_id));";

  tablaAnnotation: string = 'CREATE TABLE IF NOT EXISTS annotation(annotation_id INTEGER PRIMARY KEY autoincrement, entry_id INTEGER, user_id INTEGER, annotation_content TEXT, ban_date TEXT, reason TEXT, status_id INTEGER NOT NULL,  FOREIGN KEY("status_id") REFERENCES"tablaStatus"("status_id"));';

  //insertar defaults

  registroUser: string = "INSERT or IGNORE INTO user(user_id, role_id, username, email, password, profile_picture, register_date) VALUES (1, 1, 'USERNAME', 'USEREMAIL', 'USERPASSWORD', 'USERPASSWORD', '00/00/00' );";

  registroRole: string = "INSERT or IGNORE INTO ;";

  registroLike: string = "INSERT or IGNORE INTO ;";

  registroFollow: string = "INSERT or IGNORE INTO ;";

  registroEntry: string = "INSERT or IGNORE INTO ;";

  registroStatus: string = "INSERT or IGNORE INTO ;";

  registroTag: string = "INSERT or IGNORE INTO ;";

  registroTagEntry: string = "INSERT or IGNORE INTO ;";

  registroAnnotation: string = "INSERT or IGNORE INTO ;";

  //variables de observables

  listaUser = new BehaviorSubject([]);

  listaRole = new BehaviorSubject([]);

  listaLike = new BehaviorSubject([]);

  listaFollow = new BehaviorSubject([]);

  listaEntry = new BehaviorSubject([]);

  listaStatus = new BehaviorSubject([]);

  listaTag = new BehaviorSubject([]);

  listaTagEntry = new BehaviorSubject([]);

  listaAnnotation = new BehaviorSubject([]);


  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { }


  //observable del estado de la base de datos

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  //aqui funciones









}
