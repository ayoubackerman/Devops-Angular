import { Injectable } from '@angular/core';



const TOKEN = 'token'
const USER = 'user'
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }
  public saveToken (token : string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
  public saveUser (user : any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }
  static getToken():string | null{
    return localStorage.getItem(TOKEN);
  }
  static getUser(): any {
    const userJson = localStorage.getItem(USER);
    return userJson ? JSON.parse(userJson) : null;
  }
  
  static getUserId(): string {
    const user = this.getUser();
    
    if (!user || !user.userId) {
      return ''; // Return an empty string if user or user.id is null or undefined
    } else {
      return user.userId; // Convert the user id to a string and return
    }
  }
  static GetUserName():string{
    const user = this.getUser();
    if(user==null){
      return '';

    }else{
      return user.name;
    }
  }
  static getUserRole():string{
    const user = this.getUser();
    if(user==null){
      return '';

    }else{
      return user.role;
    }
  }
  static isAdminLogged():boolean{
    if(this.getToken===null){
      return false;

    }
    const Role:string = this.getUserRole();
    return Role == 'USER'
  
    }
    static isCustumerLogged():boolean{
      if(this.getToken===null){
        return false;
  
      }
      const Role:string = this.getUserRole();
      return Role == 'SUPERADMIN'
    
      }
      static signOut():void {
        window.localStorage.removeItem(TOKEN);
        window.localStorage.removeItem(USER);

      }
  }
