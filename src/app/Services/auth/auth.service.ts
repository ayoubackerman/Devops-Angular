import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { Helper } from 'src/app/utils/Helper';






@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient,
    private userStorageService: UserStorageService , private helper: Helper) { }

  register(signupRequest:any): Observable<any> {
    return this.http.post(this.helper.baseUrl+"auth/signup",signupRequest);

  }

  login(username:string,password:string):any{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    const body = {username,password};

    return this.http.post(this.helper.baseUrl+"auth/login",body,{headers , observe:'response' }).pipe(
      map((res)=>{
        const token = res.headers.get('Authorization')?.substring(7);
        const user =res.body;
        console.log(res.headers)
        if(token && user){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true ;
        }
        return false
  }
    )
    )
  }
}
