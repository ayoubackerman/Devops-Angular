import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { userItems } from './header-dummy-data';
import { UserStorageService } from '../Services/storage/user-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 name !: string;

 @Input() collapsed = false ;
 @Input() screenWidth = 0 ;

 canShowSearchAsOverlay = false ;

 useritems=userItems;

 @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.name = UserStorageService.GetUserName();
  }

  logout(){
    UserStorageService.signOut();
  }
  getHeadClass(): string {
    let styleClass ='';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = "head-trimmed";
      
    }else {
      styleClass = "head-md-screen";
    }
    return styleClass;
    }
    checkCanShowSearchAsOverlay(innerWidth : number):void {
      if(innerWidth < 845) {
        this.canShowSearchAsOverlay = true ;
      }else {this.canShowSearchAsOverlay = false ;

      }
    }



}
