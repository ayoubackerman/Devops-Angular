import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { UserStorageService } from '../Services/storage/user-storage.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(2turn)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData: any[] | undefined; // Adjusted to dynamically handle data based on roles

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.configureSideNavData();
  }

  configureSideNavData(): void {
    const role = UserStorageService.getUserRole();
    const baseNavData = [
      {
          routeLink: 'dashboard',
          icon: 'fal fa-home',
          label: 'Dashboard'
      },
      {
          routeLink: 'categorie',
          icon: 'fal fa-tags', // Icon for "Gérer les catégories"
          label: 'Gérer les catégories'
      },
      {
          routeLink: 'produit',
          icon: 'fal fa-box', // Icon for "Gérer les produits"
          label: 'Gérer les produits'
      },
      {
          routeLink: 'client',
          icon: 'fal fa-users', // Icon for "Gérer les clients"
          label: 'Gérer les clients'
      },
      {
          routeLink: 'devi',
          icon: 'fal fa-file-invoice', // Icon for "Gérer les devis"
          label: 'Gérer les devis'
      },
      {
          routeLink: 'projet',
          icon: 'fal fa-chart-bar', // Icon for "Gérer les projets"
          label: 'Gérer les projets'
      },
      {
          routeLink: 'signature',
          icon: 'fal fa-pen', // Icon for "Signature"
          label: 'Signature'
      },
      // additional menu items...
  ];

    if (role === 'SUPERADMIN') {
      this.navData = [{ routeLink: 'dashboard', icon: 'fal fa-home', label: 'Accueil' },{ routeLink: 'statistics', icon: 'fal fa-plus-circle', label: 'Ajouter un compte'},{ routeLink: 'userList', icon: 'fal fa-list-alt', label: 'Liste des utilisateurs'}, ...baseNavData];
    } else {
      this.navData = baseNavData; // Only basic nav data for non-super admins
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}
