import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie/categorie.service';
import { ClientService } from 'src/app/Services/client/client.service';
import { ProduitService } from 'src/app/Services/produit/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {

  clientForm!: FormGroup;
  listOfCategories: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private _cli: ClientService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document

  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],


    });

  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }
  reload() {
    this.document.location.reload();
  }


  addProduct(): void {
    if (this.clientForm.invalid) {
      for (const i in this.clientForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.clientForm.controls, i)) {
          this.clientForm.controls[i].markAsDirty();
          this.clientForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile as Blob);
      formData.append('name', this.clientForm.get('name')!.value);
      formData.append('email', this.clientForm.get('email')!.value);
      formData.append('phoneNumber', this.clientForm.get('phoneNumber')!.value);
  
      this._cli.addItem(formData).subscribe((res) => {
        if (res.id !== null) {
          Swal.fire({
            title: 'Success!',
            text: 'Product added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.reload(); // Reload after user confirms the success alert
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: res.message,
            icon: 'error',
            confirmButtonText: 'Close'
          });
        }
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while adding the product.',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      });
    }
  }
}
