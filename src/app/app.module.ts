import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { MainComponent } from './main/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from "@angular/material/dialog";
import { HeaderComponent } from './header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { NgxPaginationModule } from 'ngx-pagination';

import { CategorieComponent } from './categorie/categorie/categorie.component';
import { ProduitComponent } from './produit/produit/produit.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ProjetComponent } from './projet/projet/projet.component';
import { ClientComponent } from './client/client/client.component';
import { AddCategorieComponent } from './categorie/AddCategorie/add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './categorie/UpdateCategorie/update-categorie/update-categorie.component';
import { AddProduitComponent } from './produit/addProduit/add-produit/add-produit.component';
import { UpdateProduitComponent } from './produit/updateProduit/update-produit/update-produit.component';
import { AddClientComponent } from './client/AddClient/add-client/add-client.component';
import { UpdateClientComponent } from './client/UpdateClient/update-client/update-client.component';
import { AddProjetComponent } from './projet/AddProjet/add-projet/add-projet.component';
import { UpdateProjetComponent } from './projet/UpdateProjet/update-projet/update-projet.component';





@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    MainComponent,
    HeaderComponent,
    PagenotfoundComponent,
    CategorieComponent,
    ProduitComponent,
    ProjetComponent,
    ClientComponent,
    AddCategorieComponent,
    UpdateCategorieComponent,
    AddProduitComponent,
    UpdateProduitComponent,
    AddClientComponent,
    UpdateClientComponent,
    AddProjetComponent,
    UpdateProjetComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    OverlayModule,
    CdkMenuModule,
    DemoAngularMaterialModule,
    NgxPaginationModule,
    SignaturePadModule

    



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
