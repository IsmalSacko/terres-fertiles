import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EtapesComponent } from './pages/etapes/etapes.component';
import { DocumentGisementComponent } from './document-gisement/document-gisement.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { GisementListComponent } from './gisement-list/gisement-list.component';
import { GisementDetailComponent } from './gisement-detail/gisement-detail.component';
import { MelangeListComponent } from './melange-list/melange-list.component';
import { MelangeDetailComponent } from './melange-detail/melange-detail.component';
import { ProduitVenteListComponent } from './produit-vente-list/produit-vente-list.component';
import { ProduitVenteDetailComponent } from './produit-vente-detail/produit-vente-detail.component';
import { DocumentTechniqueListComponent } from './document-technique-list/document-technique-list.component';
import { DocumentTechniqueDetailComponent } from './document-technique-detail/document-technique-detail.component';
import { AnalyseLaboratoireListComponent } from './analyse-laboratoire-list/analyse-laboratoire-list.component';
import { AnalyseLaboratoireDetailComponent } from './analyse-laboratoire-detail/analyse-laboratoire-detail.component';
import { LoginComponent } from './login/login.component';
import { GisementCreateComponent } from './gisement-create/gisement-create.component';
import { ChantierListComponent } from './chantier-list/chantier-list.component';
import { ChantierDetailComponent } from './chantier-detail/chantier-detail.component';
import { MelangeAmendementListComponent } from './melange-amendement-list/melange-amendement-list.component.ts.component';
import { AmendementOrganiqueCreateComponent } from './amendement-organique-create/amendement-organique-create.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ActivateComponent } from './activate/activate.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './auth/reset-password-confirm/reset-password-confirm.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'etapes', component: EtapesComponent },
  { path: 'documents-gisement', component: DocumentGisementComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil',component: UserProfileComponent },
  { path: 'chantiers', component: ChantierListComponent },
  { path: 'chantiers/new', component: ChantierDetailComponent },
  { path: 'chantiers/:id', component: ChantierDetailComponent },
  { path: 'gisements', component: GisementListComponent },
  { path: 'gisements/new', component: GisementCreateComponent },
  { path: 'gisements/:id', component: GisementDetailComponent },  
  { path: 'melanges-amendements', component: MelangeAmendementListComponent },
  { path: 'amendement-organique-create', component: AmendementOrganiqueCreateComponent},
  
  { path: 'melanges', component: MelangeListComponent },
  { path: 'melanges/new', component: MelangeDetailComponent },
  { path: 'melanges/:id', component: MelangeDetailComponent },

  { path: 'produits-vente', component: ProduitVenteListComponent },
  { path: 'produits-vente/:id', component: ProduitVenteDetailComponent },

  { path: 'documents-techniques', component: DocumentTechniqueListComponent },
  { path: 'documents-techniques/:id', component: DocumentTechniqueDetailComponent },

  { path: 'analyses-laboratoire', component: AnalyseLaboratoireListComponent },
  { path: 'analyses-laboratoire/:id', component: AnalyseLaboratoireDetailComponent },

  { path: 'activate/:uid/:token', component: ActivateComponent},
  
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'reset-password-confirm/:uid/:token', component:ResetPasswordConfirmComponent}
];
