import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/utils/Helper';
import { UserStorageService } from '../storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ScriptServiceService {

  constructor(private http :HttpClient, private helper: Helper) { }
  



  getDemande():Observable<any>{
    return this.http.get(this.helper.baseUrl+"Script",{
      headers:this.createAuthorizationHeader(),
    });
    
  }

  
  addDemande(scriptdto:any,demandeId:any):Observable<any>{
    return this.http.post(this.helper.baseUrl+`Script/Add/${demandeId}`,scriptdto,{
      headers:this.createAuthorizationHeader(),
    });
    
  }

  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set('Authorization','Bearer'+UserStorageService.getToken())
  }
}
