import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie/categorie.service';
import { DepartementService } from 'src/app/Services/Departement/departement.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.scss']
})
export class UpdateCategorieComponent {

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private _cat: CategorieService,
    private _dep: DepartementService,
    private router: Router,
    private activatedroute:ActivatedRoute,
    private _dialogue : MatDialogRef<UpdateCategorieComponent>,@Inject(MAT_DIALOG_DATA) public data: { codeItem: any } 
     ) {console.log(data.codeItem);}
     
  itemId: number = this.data.codeItem; 
  categorieForm!: FormGroup;



 
  ngOnInit(): void {
this.getItemById();

this.categorieForm = this.fb.group({
  nomDepart: [null, [Validators.required]],
    });
  }

  getItemById(){
    console.log(this.itemId);
    this._dep.getItemById(this.itemId).subscribe(res=>{
      this.categorieForm.patchValue(res);
     } )
  }

  reloadPage() {
    location.reload();
  }

  UpdateItem(): void {
    if (this.categorieForm.invalid) {
      for (const i in this.categorieForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.categorieForm.controls, i)) {
          this.categorieForm.controls[i].markAsDirty();
          this.categorieForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      const formData: FormData = new FormData();

    
      formData.append('nomDepart', this.categorieForm.get('nomDepart')!.value);


      this._dep.updateItem(this.itemId,formData).subscribe((res) => {
        if (res.id !== null) {
          this.snackbar.open('item added successfully', 'Close', { duration: 5000 });
        //  this.router.navigateByUrl('/Items');
        this.reloadPage();
        } else {
          console.log(res);
          this.snackbar.open(res.message, 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      });
    }
  }


}
