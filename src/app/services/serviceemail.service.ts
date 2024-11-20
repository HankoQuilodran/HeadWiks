import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceemailService {


  API_URL = 'https://api.emailjs.com/api/v1.0/email/send';
  PUBLIC_KEY = "Pr3aecbmg-1BSuWT0";
  SERVICE_ID = "service_a3gta7v";
  // PASSWORD REMINDER
  PASSWORD_TEMPLATE_ID = "template_i51n7o7";
  // ENTRY DEACTIVATION REPORT
  ENTRY_REPORT_TEMPLATE_ID = "template_ysskv4a";

  constructor(private http: HttpClient) { }


  enviarCorreo(email: string, password: string):Observable<any> {
    //Parametros del correo
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    let body = {
      "service_id": this.SERVICE_ID,
      "template_id": this.PASSWORD_TEMPLATE_ID,
      "user_id": this.PUBLIC_KEY,
      "template_params": {
        "email": email,
        "message": password
      }
    }

    // Enviamos el correo y manejamos el resultado con suscripción
    return this.http.post(this.API_URL, body, { headers });
  }

  enviarReporte(email: string, report: string):Observable<any> {
    //Parametros del correo
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    let body = {
      "service_id": this.SERVICE_ID,
      "template_id": this.ENTRY_REPORT_TEMPLATE_ID,
      "user_id": this.PUBLIC_KEY,
      "template_params": {
        "email": email,
        "message": report
      }
    }

    // Enviamos el correo y manejamos el resultado con suscripción
    return this.http.post(this.API_URL, body, { headers });
  }

}
