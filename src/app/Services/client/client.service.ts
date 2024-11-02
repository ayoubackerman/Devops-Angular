import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:8088/";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

 
  
  getItem():Observable<any>{
    return this.http.get(BASE_URL+"api/client"
    )
  }
  getItemById(idItem : any):Observable<any>{
    return this.http.get(BASE_URL+`api/client/${idItem}`
    )
  }
  addItem(itemDto:any):Observable<any>{
    return this.http.post(BASE_URL+"api/client/Add",itemDto)
  }
  deleteItemById(idItem : any):Observable<any>{
    return this.http.delete(BASE_URL+`api/client/delete/${idItem}`)
  }
  updateItem(idItem : number, itemDto : any):Observable<any>{
    return this.http.put(BASE_URL+`api/client/Update/${idItem}`,itemDto);
  }
}
