import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:8088/";


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) { }

 
  
  getItem():Observable<any>{
    return this.http.get(BASE_URL+"api/produit"
    )
  }
  getItemById(idItem : any):Observable<any>{
    return this.http.get(BASE_URL+`api/produit/${idItem}`
    )
  }
  addItem(itemDto:any):Observable<any>{
    return this.http.post(BASE_URL+"api/produit/Add",itemDto)
  }
  deleteItemById(idItem : any):Observable<any>{
    return this.http.delete(BASE_URL+`api/produit/delete/${idItem}`)
  }
  updateItem(idItem : number, itemDto : any):Observable<any>{
    return this.http.put(BASE_URL+`api/produit/Update/${idItem}`,itemDto);
  }}
