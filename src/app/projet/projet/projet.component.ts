import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjetService } from 'src/app/Services/projet/projet.service';
import Swal from 'sweetalert2';
import { AddProjetComponent } from '../AddProjet/add-projet/add-projet.component';
import { UpdateProjetComponent } from '../UpdateProjet/update-projet/update-projet.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent {

  projets: any[] = [];
  filteredProjets: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _dialogue: MatDialog,
    private _proj: ProjetService
  ) {}

  openAddItem() {
    this._dialogue.open(AddProjetComponent);
  }

  openUpdate(codeItem: any) {
    this._dialogue.open(UpdateProjetComponent, {
      data: { codeItem: codeItem }
    });
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this._proj.getItem().subscribe(res => {
      this.projets = res;
      this.filteredProjets = this.projets; // Initialize filteredProjets
    });
  }

  applyFilter() {
    this.filteredProjets = this.projets.filter(projet =>
      projet.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteItem(deviId: any) {
    this._proj.deleteItemById(deviId).subscribe(res => {
      if (res && res.body) {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while trying to delete the item.',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: 'Deleted!',
          text: 'Item deleted successfully.',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        });
        this.getAllProjects(); // Refresh the list after deletion
      }
    });
  }
}
