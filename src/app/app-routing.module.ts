import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main/main.component';
import { AuthGuard } from './Services/auth/auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { CategorieComponent } from './categorie/categorie/categorie.component';
import { ProduitComponent } from './produit/produit/produit.component';
import { DeviComponent } from './devi/devi/devi.component';
import { SignatureComponent } from './signature/signature/signature.component';
import { ProjetComponent } from './projet/projet/projet.component';
import { ClientComponent } from './client/client/client.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    component: MainComponent, 
    children: [
      { path: 'devi', component: DeviComponent },
      { path: 'categorie', component: CategorieComponent },
      { path: 'projet', component: ProjetComponent },
      { path: 'produit', component: ProduitComponent },
      { path: 'client', component: ClientComponent },
      { path: 'signature', component: SignatureComponent },

    ]
  },
  { path: '**', pathMatch: 'full',  
        component: PagenotfoundComponent }, 
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
