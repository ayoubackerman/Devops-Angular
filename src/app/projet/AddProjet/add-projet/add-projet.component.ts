import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/Services/client/client.service';
import { ProjetService } from 'src/app/Services/projet/projet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss']
})
export class AddProjetComponent {
  projetForm!: FormGroup;
  listOfClients: any[] = [];


  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private _projet: ProjetService, // Assuming you have a ProjetService
    private _cli: ClientService, // Assuming you have a ProjetService

    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {

    this.projetForm = this.fb.group({
      description: [null, [Validators.required]],
      budget: [null, [Validators.required]],
      status: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      clientId: [null, [Validators.required]],
    });
    this.getAllClients();
  }

  getAllClients(): void {
    this._cli.getItem().subscribe(res => {
      this.listOfClients = res;
    });
  }
  reload() {
    this.document.location.reload();
  }
  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  addItem(): void {
    if (this.projetForm.invalid) {
      for (const i in this.projetForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.projetForm.controls, i)) {
          this.projetForm.controls[i].markAsDirty();
          this.projetForm.controls[i].updateValueAndValidity();
        }
      } 
    } else {
      const formData: FormData = new FormData();
      formData.append('description', this.projetForm.get('description')!.value);
      formData.append('budget', this.projetForm.get('budget')!.value);
      formData.append('status', this.projetForm.get('status')!.value);
      formData.append('startDate', this.formatDate(this.projetForm.get('startDate')!.value));
      formData.append('endDate', this.formatDate(this.projetForm.get('endDate')!.value));
      formData.append('clientId', this.projetForm.get('clientId')!.value);

      this._projet.addItem(formData).subscribe((res) => {
        if (res.id !== null) {
          Swal.fire({
            title: 'Success!',
            text: 'Projet added successfully.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
          });
          this.reload();
        } else {
          console.log(res);
          Swal.fire({
            title: 'Error!',
            text: res.message,
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      });
    }
  }
}
