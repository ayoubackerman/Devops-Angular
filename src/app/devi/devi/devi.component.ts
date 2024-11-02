import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddDeviComponent } from '../AddDevi/add-devi/add-devi.component';
import { DeviService } from 'src/app/Services/devi/devi.service';
import Swal from 'sweetalert2';
import * as saveAs from 'file-saver';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-devi',
  templateUrl: './devi.component.html',
  styleUrls: ['./devi.component.scss']
})
export class DeviComponent {

  Devis: any[] = [];
  filteredDevis: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _dialogue: MatDialog,
    private _devi: DeviService
  ) {}

  openAddItem() {
    this._dialogue.open(AddDeviComponent);
  }

  downloadPdf(): void {
    this.http.get('http://localhost:8088/api/devi/devis/pdf', { responseType: 'blob' })
      .subscribe(blob => {
        saveAs(blob, "devis.pdf");
      }, error => {
        console.error('Download error:', error);
      });
  }

  ngOnInit(): void {
    this.getAllDevi();
  }

  getAllDevi() {
    this._devi.getDevi().subscribe(res => {
      this.Devis = res;
      this.filteredDevis = this.Devis; // Initialize filteredDevis
    });
  }

  applyFilter() {
    this.filteredDevis = this.Devis.filter(devi =>
      devi.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteItem(deviId: any) {
    this._devi.deleteDeviById(deviId).subscribe(res => {
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
