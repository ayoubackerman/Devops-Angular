import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:8088/";

@Injectable({
  providedIn: 'root'
})
export class DeviService {

  constructor(private http: HttpClient) {}



 
  getDevi():Observable<any>{
    return this.http.get(BASE_URL+"api/devi"
    )
  }

  addDevi(deviDto:any):Observable<any>{
    return this.http.post(BASE_URL+"api/devi/Add",deviDto)
  }
  
  deleteDeviById(idDevi : any):Observable<any>{
    return this.http.delete(BASE_URL+`api/devi/delete/${idDevi}`)
  }
}
