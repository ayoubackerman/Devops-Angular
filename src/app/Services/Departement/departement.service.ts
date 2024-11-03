import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ="http://192.168.50.4:8089/kaddem/";


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http:HttpClient) { }

 
  
  getItem():Observable<any>{
    return this.http.get(BASE_URL+"departement/retrieve-all-departements"
    )
  }
  getItemById(idItem : any):Observable<any>{
    return this.http.get(BASE_URL+`departement/retrieve-departement/${idItem}`
    )
  }
  addItem(itemDto:any):Observable<any>{
    return this.http.post(BASE_URL+"departement/add-departement",itemDto)
  }
  deleteItemById(idItem : any):Observable<any>{
    return this.http.delete(BASE_URL+`departement/remove-departement/delete/${idItem}`)
  }
  updateItem(idItem : number, itemDto : any):Observable<any>{
    return this.http.put(BASE_URL+`departement/update-departement/Update/${idItem}`,itemDto);
  }}
