import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { Helper } from 'src/app/utils/Helper';






@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http :HttpClient, private helper: Helper) { }
  
    getadress():Observable<any>{
      return this.http.get(this.helper.baseUrl+"All");
      
    }

    getDemande():Observable<any>{
      return this.http.get(this.helper.baseUrl+"Demande",{
        headers:this.createAuthorizationHeader(),
      });
      
    }
    addDemande(demandedto:any):Observable<any>{
      return this.http.post(this.helper.baseUrl+"Demande/Add",demandedto,{
        headers:this.createAuthorizationHeader(),
      });
      
    }
    getDemandeById(idDemande : any):Observable<any>{
      return this.http.get(this.helper.baseUrl+`Demande/${idDemande}`,{
        headers:this.createAuthorizationHeader(),
      }
      )
    }

    getcount(adress : any):Observable<any>{
      return this.http.get(this.helper.baseUrl+`Demande/count/${adress}`,{
        headers:this.createAuthorizationHeader(),
      }
      )
    }
    

    deleteDemandeById(idDemande : any):Observable<any>{
      return this.http.delete(this.helper.baseUrl+`Demande/delete/${idDemande}`,{
        headers:this.createAuthorizationHeader(),
      })
    }
    updateDemande(idDemande : number, demandedto : any):Observable<any>{
      return this.http.put(this.helper.baseUrl+`Demande/Update/${idDemande}`,demandedto,{
        headers:this.createAuthorizationHeader(),
      });
    }

    private createAuthorizationHeader():HttpHeaders{
      return new HttpHeaders().set('Authorization','Bearer'+UserStorageService.getToken())
    }
  
  
  }
