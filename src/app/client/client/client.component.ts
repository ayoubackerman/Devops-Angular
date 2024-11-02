import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/Services/client/client.service';
import Swal from 'sweetalert2';
import { AddClientComponent } from '../AddClient/add-client/add-client.component';
import { UpdateClientComponent } from '../UpdateClient/update-client/update-client.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {

  clients: any[] = [];
  filteredClients: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _dialogue: MatDialog,
    private _cli: ClientService
  ) {}

  openAddItem() {
    this._dialogue.open(AddClientComponent);
  }

  openUpdate(codeItem: any) {
    this._dialogue.open(UpdateClientComponent, {
      data: { codeItem: codeItem }
    });
  }

  ngOnInit(): void {
    this.getAllClient();
  }

  getAllClient() {
    this._cli.getItem().subscribe(res => {
      res.forEach((element: { processedImg: string; byteImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.clients.push(element);
      });
      this.filteredClients = this.clients; // Initialize filteredClients
    });
  }

  applyFilter() {
    this.filteredClients = this.clients.filter(client => 
      client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // Optional: If you want to implement server-side pagination, handle it here
  }

  deleteItem(clientId: any) {
    this._cli.deleteItemById(clientId).subscribe(res => {
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
        this.getAllClient(); // Refresh the list after deletion
      }
    });
  }
}
