import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helper } from 'src/app/utils/Helper';
import { UserStorageService } from '../storage/user-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient, private helper: Helper) { }



  getAllUser():Observable<any>{
    return this.http.get(this.helper.baseUrl+"getAllUsers",{
      headers:this.createAuthorizationHeader(),
    });
    
  }
  deleteUserById(idUser : any):Observable<any>{
    return this.http.delete(this.helper.baseUrl+`deleteUser/${idUser}`,{
      headers:this.createAuthorizationHeader(),
    })
  }
  changepassword(changepassworddto : any):Observable<any>{
    return this.http.put(this.helper.baseUrl+"auth/change-password",changepassworddto,{
      headers:this.createAuthorizationHeader(),
    });
  }
  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set('Authorization','Bearer'+UserStorageService.getToken())
  }


}
