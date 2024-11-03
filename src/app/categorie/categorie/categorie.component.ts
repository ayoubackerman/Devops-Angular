import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie/categorie.service';
import Swal from 'sweetalert2';
import { AddCategorieComponent } from '../AddCategorie/add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from '../UpdateCategorie/update-categorie/update-categorie.component';
import { PageEvent } from '@angular/material/paginator';
import { DepartementService } from 'src/app/Services/Departement/departement.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent {
  categories: any[] = [];
  filteredCategories: any[] = [];
  paginatedCategories: any[] = [];
  searchTerm: string = '';
  pageSize: number = 5;
  pageEvent: PageEvent | undefined;

  constructor(
    private router: Router,
    private _dialogue: MatDialog,
    private _cat: CategorieService,
    private _dep : DepartementService

  
  ) {}

  openAddItem() {
    this._dialogue.open(AddCategorieComponent);
  }

  openUpdate(codeItem: any) {
    this._dialogue.open(UpdateCategorieComponent, {
      data: { codeItem: codeItem }
    });
  }

  ngOnInit(): void {
    this.getAllDevi();
  }

  getAllDevi() {
    this._dep.getItem().subscribe(res => {
      this.categories = res;
      this.filteredCategories = res; // Initialize filtered categories
      this.paginate();
    });
  }

  applyFilter() {
    if (this.searchTerm) {
      this.filteredCategories = this.categories.filter(dev =>
        dev.nomDepart.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      );
    } else {
      this.filteredCategories = [...this.categories];
    }
    this.paginate(); // Re-paginate after filtering
  }

  paginate() {
    const startIndex = (this.pageEvent ? this.pageEvent.pageIndex : 0) * this.pageSize;
    this.paginatedCategories = this.filteredCategories.slice(startIndex, startIndex + this.pageSize);
  }

  deleteItem(deviId: any) {
    this._dep.deleteItemById(deviId).subscribe(res => {
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
        this.getAllDevi(); // Refresh the list after deletion
      }
    });
  }
}
