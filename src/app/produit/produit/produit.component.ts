import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/Services/produit/produit.service';
import Swal from 'sweetalert2';
import { AddProduitComponent } from '../addProduit/add-produit/add-produit.component';
import { UpdateProduitComponent } from '../updateProduit/update-produit/update-produit.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent {

  produits: any[] = [];
  filteredProduits: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _dialogue: MatDialog,
    private _prod: ProduitService
  ) {}

  openAddItem() {
    this._dialogue.open(AddProduitComponent);
  }

  openUpdate(codeItem: any) {
    this._dialogue.open(UpdateProduitComponent, {
      data: { codeItem: codeItem }
    });
  }

  ngOnInit(): void {
    this.getAllDevi();
  }

  getAllDevi() {
    this._prod.getItem().subscribe(res => {
      res.forEach((element: { processedImg: string; byteImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.produits.push(element);
      });
      this.filteredProduits = this.produits; // Initialize filteredProduits
    });
  }

  applyFilter() {
    this.filteredProduits = this.produits.filter(prod => 
      prod.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // Optional: If you want to implement server-side pagination, handle it here
  }

  deleteItem(deviId: any) {
    this._prod.deleteItemById(deviId).subscribe(res => {
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
