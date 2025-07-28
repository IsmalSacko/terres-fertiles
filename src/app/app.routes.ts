import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DocumentGisementComponent } from './pages/gisments/document-gisement/document-gisement.component';
import { GisementDetailComponent } from './pages/gisments/gisement-detail/gisement-detail.component';
import { GisementListComponent } from './pages/gisments/gisement-list/gisement-list.component';
import { MelangeListComponent } from './pages/melanges/melange-list/melange-list.component';
import { MelangeDetailComponent } from './pages/melanges/melange-detail/melange-detail.component';
import { ProduitVenteListComponent } from './pages/produits/produit-vente-list/produit-vente-list.component';
import { ProduitVenteDetailComponent } from './pages/produits/produit-vente-detail/produit-vente-detail.component';
import { AnalyseLaboratoireListComponent } from './pages/produits/labo/analyse-laboratoire-list/analyse-laboratoire-list.component';
import { AnalyseLaboratoireDetailComponent } from './pages/produits/labo/analyse-laboratoire-detail/analyse-laboratoire-detail.component';
import { LoginComponent } from './pages/compte/login/login.component';
import { GisementCreateComponent } from './pages/gisments/gisement-create/gisement-create.component';
import { ChantierListComponent } from './pages/chantiers/chantier-list/chantier-list.component';
import { ChantierDetailComponent } from './pages/chantiers/chantier-detail/chantier-detail.component';
import { MelangeAmendementListComponent } from './pages/melanges/melange-amendement-list/melange-amendement-list.component.ts.component';
import { AmendementOrganiqueCreateComponent } from './pages/produits/labo/amendement-organique-create/amendement-organique-create.component';
import { RegisterComponent } from './pages/compte/register/register.component';
import { UserProfileComponent } from './pages/compte/user-profile/user-profile.component';
import { ActivateComponent } from './pages/compte/activate/activate.component';
import { ResetPasswordComponent } from './pages/compte/reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './pages/compte/auth/reset-password-confirm/reset-password-confirm.component';
import {PlanningComponent} from './pages/planning/planning.component';


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'documents-gisement', component: DocumentGisementComponent },
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
  { path: 'produits-vente', component: ProduitVenteListComponent },
  { path: 'produits/:id', component: ProduitVenteDetailComponent },

  { path: 'analyses-laboratoire', component: AnalyseLaboratoireListComponent },
  { path: 'analyses-laboratoire/:id', component: AnalyseLaboratoireDetailComponent },

  { path: 'activate/:uid/:token', component: ActivateComponent},

  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'reset-password-confirm/:uid/:token', component:ResetPasswordConfirmComponent},

  {path: 'planning', component: PlanningComponent},

];
