import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie/categorie.service';
import { ProduitService } from 'src/app/Services/produit/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.scss']
})
export class UpdateProduitComponent {

  productForm!: FormGroup;
  listOfCategories: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage : string |null= null ;
  imgChanged = false;


  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private _prod: ProduitService,
    private _cat: CategorieService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private _dialogue : MatDialogRef<UpdateProduitComponent>,@Inject(MAT_DIALOG_DATA) public data: { codeItem: any } 

  ) {console.log(data.codeItem);}

  itemId = this.data.codeItem; 


  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      prix: [null, [Validators.required]],
      CategoryId: [null, [Validators.required]],
      quantity: [null, [Validators.required]],

    });

    this.getAllCategories();
    this.getItemById();
  }

  getItemById(){
    console.log(this.itemId);
    this._prod.getItemById(this.itemId).subscribe(res=>{
      this.productForm.patchValue(res);
      this.existingImage = `data:image/jpeg;base64,`+ res.byteImg;
     } )
  }


  getAllCategories(): void {
    this._cat.getItem().subscribe(res => {
      this.listOfCategories = res;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged =true;
    this.existingImage = null;
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
    if (this.productForm.invalid) {
      for (const i in this.productForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.productForm.controls, i)) {
          this.productForm.controls[i].markAsDirty();
          this.productForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      const formData: FormData = new FormData();
      if(this.imgChanged && this.selectedFile){
        formData.append('img', this.selectedFile as Blob);
      }     
       formData.append('CategoryId', this.productForm.get('CategoryId')!.value);
      formData.append('name', this.productForm.get('name')!.value);
      formData.append('prix', this.productForm.get('prix')!.value);
      formData.append('description', this.productForm.get('description')!.value);
      formData.append('quantity', this.productForm.get('quantity')!.value);
  
      this._prod.updateItem(this.itemId,formData).subscribe((res) => {
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
