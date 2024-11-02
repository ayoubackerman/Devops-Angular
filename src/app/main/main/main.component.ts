import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component'


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  isSideNavCollapsed = false;


  screenWidth = window.innerWidth;



  toggleSidebar(): void {
    // Toggle logic for sidebar
    this.isSideNavCollapsed = !this.isSideNavCollapsed;
  }
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
