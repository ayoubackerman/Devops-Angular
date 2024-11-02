import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie/categorie.service';
import { DeviService } from 'src/app/Services/devi/devi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent {

  categorieForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
 private _cat: CategorieService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document

  ) {}

  ngOnInit(): void {
    this.categorieForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
        });
  }

  reload() {
    this.document.location.reload();
  }

  addItem(): void {
    if (this.categorieForm.invalid) {
      for (const i in this.categorieForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.categorieForm.controls, i)) {
          this.categorieForm.controls[i].markAsDirty();
          this.categorieForm.controls[i].updateValueAndValidity();
        }
      } 
    } else {
      const formData: FormData = new FormData();
      formData.append('description', this.categorieForm.get('description')!.value);
      formData.append('name', this.categorieForm.get('name')!.value);
  
      this._cat.addItem(formData).subscribe((res) => {
        if (res.id !== null) {
          Swal.fire({
            title: 'Success!',
            text: 'categorie added successfully.',
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
