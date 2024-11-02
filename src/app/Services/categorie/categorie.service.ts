import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:8088/";



@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http:HttpClient) { }

 
  
  getItem():Observable<any>{
    return this.http.get(BASE_URL+"api/categorie"
    )
  }
  getItemById(idItem : any):Observable<any>{
    return this.http.get(BASE_URL+`api/categorie/${idItem}`
    )
  }
  addItem(itemDto:any):Observable<any>{
    return this.http.post(BASE_URL+"api/categorie/Add",itemDto)
  }
  deleteItemById(idItem : any):Observable<any>{
    return this.http.delete(BASE_URL+`api/categorie/delete/${idItem}`)
  }
  updateItem(idItem : number, itemDto : any):Observable<any>{
    return this.http.put(BASE_URL+`api/categorie/Update/${idItem}`,itemDto);
  }}
