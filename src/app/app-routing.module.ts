import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LayoutRegistreComponent } from './components/layout-registre/layout-registre.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegistreComponent } from './components/registre/registre.component';
import { DemandeEmployeeComponent } from './demandes/demande-employee/demande-employee.component';
import { DemandeEmpolyeeTraiterComponent } from './demandes/demande-empolyee-traiter/demande-empolyee-traiter.component';
// import { DemandeEmpComponent } from './demande/demande-emp/demande-emp.component';
import { DemandeNonTraiterComponent } from './demandes/demande-non-traiter/demande-non-traiter.component';
import { DemandeTraiterComponent } from './demandes/demande-traiter/demande-traiter.component';
import { DemandeinterventionCreateComponent } from './demandes/demandeintervention-create/demandeintervention-create.component';
import { DemandeinterventionListComponent } from './demandes/demandeintervention-list/demandeintervention-list.component';
import { DemandeinterventionUpdateComponent } from './demandes/demandeintervention-update/demandeintervention-update.component';
import { CreateEquipementComponent } from './equipement/create-equipement/create-equipement.component';
import { ListeEquipementComponent } from './equipement/liste-equipement/liste-equipement.component';
import { UpdateEquipementComponent } from './equipement/update-equipement/update-equipement.component';
import { ViewEquipementComponent } from './equipement/view-equipement/view-equipement.component';
import { CreateFournisseurComponent } from './fournisseur/create-fournisseur/create-fournisseur.component';
import { ListeFournisseurComponent } from './fournisseur/liste-fournisseur/liste-fournisseur.component';
import { UpdateFournisseurComponent } from './fournisseur/update-fournisseur/update-fournisseur.component';
import { ViewFournisseurComponent } from './fournisseur/view-fournisseur/view-fournisseur.component';
import { InterventionCreateComponent } from './intervention/intervention-create/intervention-create.component';
import { InterventionListComponent } from './intervention/intervention-list/intervention-list.component';
import { InterventionUpdateComponent } from './intervention/intervention-update/intervention-update.component';
import { ModifierlistpieceComponent } from './intervention/modifierlistpiece/modifierlistpiece.component';
import { RapportComponent } from './intervention/rapport/rapport.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';
import { CreateOrdreComponent } from './ordre/create-ordre/create-ordre.component';
import { ListOrdreInterventionComponent } from './ordre/list-ordre-intervention/list-ordre-intervention.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { OrdreTechComponent } from './ordre/ordre-tech/ordre-tech.component';
import { OrdreTraiteComponent } from './ordre/ordre-traite/ordre-traite.component';
import { UpdateOrdreComponent } from './ordre/update-ordre/update-ordre.component';
import { CreatePiecesComponent } from './pieces/create-pieces/create-pieces.component';
import { ListPiecesComponent } from './pieces/list-pieces/list-pieces.component';
import { UpdatePiecesComponent } from './pieces/update-pieces/update-pieces.component';
import { ViewPiecesComponent } from './pieces/view-pieces/view-pieces.component';
import { ProfilComponent } from './profil/profil.component';
import { CreateServiceComponent } from './service/create-service/create-service.component';
import { ServiceComponent } from './service/service/service.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';
import { AdminCreateComponent } from './superadmin/admin-create/admin-create.component';
import { AdminUpdateComponent } from './superadmin/admin-update/admin-update.component';
import { AdminViewComponent } from './superadmin/admin-view/admin-view.component';
import { AdminsComponent } from './superadmin/admins/admins.component';
import { EmployeeCreateComponent } from './superadmin/employee-create/employee-create.component';
import { EmployeeListComponent } from './superadmin/employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './superadmin/employee-update/employee-update.component';
import { EmployeeViewComponent } from './superadmin/employee-view/employee-view.component';
import { TechnicienCreateComponent } from './superadmin/technicien-create/technicien-create.component';
import { TechnicienUpdateComponent } from './superadmin/technicien-update/technicien-update.component';
import { TechnicienViewComponent } from './superadmin/technicien-view/technicien-view.component';
import { TechnicienComponent } from './superadmin/technicien/technicien.component';
import { ListeComponent } from './préventive/liste/liste.component';
import { CreatepreventiveComponent } from './préventive/createpreventive/createpreventive.component';
import { ModifpreventiveComponent } from './préventive/modifpreventive/modifpreventive.component';
import { DetailpreventiveComponent } from './préventive/detailpreventive/detailpreventive.component';
import { Home2Component } from './components/home2/home2.component';

const routes: Routes = [
{  path: '', component:LoginComponent},
{ path: 'login', component:LoginComponent,pathMatch: 'full',},

{ 
  path: '', 
  component: LayoutComponent,
  children: [
    
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ],pathMatch: 'full',},
    {path:'techniciens' ,component:TechnicienComponent,canActivate: [ AuthGuard ], data: {
      title: 'techniciens'
  }},
    {path:'admins' ,component:AdminsComponent,canActivate: [ AuthGuard ]},
    {path:'list' ,component:ListeComponent,canActivate: [ AuthGuard ]},
    {path:'preventive-create' ,component:CreatepreventiveComponent,canActivate: [ AuthGuard ]},
    {path:'preventive-update/:id' ,component:ModifpreventiveComponent,canActivate: [ AuthGuard ]},
    {path:'detailpreventive/:id' ,component:DetailpreventiveComponent,canActivate: [ AuthGuard ]},



    {path:'modifierlistepiece/:id' ,component:ModifierlistpieceComponent,canActivate: [ AuthGuard ]},
    
    { path: 'homeemploye', component:Home2Component, canActivate: [ AuthGuard ]},

    

    {path:'employee-create' ,component:EmployeeCreateComponent,canActivate: [ AuthGuard ]},
    {path:'employee-update/:id' ,component:EmployeeUpdateComponent,canActivate: [ AuthGuard ]},
    {path:'employee-list' ,component:EmployeeListComponent,canActivate: [ AuthGuard ]},
    {path:'employee-View/:id' ,component:EmployeeViewComponent,canActivate: [ AuthGuard ]},


    {path:'technicien' ,component:TechnicienComponent,canActivate: [ AuthGuard ]},
    {path:'technicien-create' ,component:TechnicienCreateComponent,canActivate: [ AuthGuard ]},
    {path:'technicien-update/:id' ,component:TechnicienUpdateComponent,canActivate: [ AuthGuard ]},
    {path:'technicien-View/:id' ,component:TechnicienViewComponent,canActivate: [ AuthGuard ]},
    
    {path:'admin' ,component:AdminsComponent,canActivate: [ AuthGuard ]},
    {path:'admin-create' ,component:AdminCreateComponent, },
    {path:'admin-update/:id' ,component:AdminUpdateComponent,canActivate: [ AuthGuard ]},
    {path:'admin-View/:id' ,component:AdminViewComponent,canActivate: [ AuthGuard ]},
    
    {path:'profil' ,component:ProfilComponent,canActivate: [ AuthGuard ]},
    {path:'modifier-profil',component:ModifierProfilComponent,canActivate: [ AuthGuard ]},
    
    {path:'Demande-intervention' ,component:DemandeinterventionCreateComponent,canActivate: [ AuthGuard ]},
    {path:'update-demande/:id',component:DemandeinterventionUpdateComponent,canActivate: [ AuthGuard ]},
    {path:'Details-Demande/:id',component:DemandeinterventionListComponent,canActivate: [ AuthGuard ]},
    {path:'demandetraiter',component:DemandeTraiterComponent,canActivate: [ AuthGuard ]},
    {path:'demandeNontraiter',component:DemandeNonTraiterComponent,canActivate: [ AuthGuard ]},
    {path:'Demandetraiter',component:DemandeEmployeeComponent,canActivate: [ AuthGuard ]},
    {path:'DemandeNontraiter',component:DemandeEmpolyeeTraiterComponent,canActivate: [ AuthGuard ]},

    
    
    {path:'create-intervention/:id' ,component:InterventionCreateComponent,canActivate: [ AuthGuard ]},
    {path:'update-intervention/:id',component:InterventionUpdateComponent,canActivate: [ AuthGuard ]},
    {path:'list-intervention',component:InterventionListComponent,canActivate: [ AuthGuard ]},
    {path:'createOrdre/:id/:idTech',component:CreateOrdreComponent,canActivate: [ AuthGuard ]  },    
    {path:'CreateEquipement' ,component:CreateEquipementComponent,canActivate: [ AuthGuard ]},
    {path:'update-equipement/:id',component:UpdateEquipementComponent,canActivate: [ AuthGuard ]},
    {path:'View-equipement/:id',component:ViewEquipementComponent, canActivate: [ AuthGuard ]},
    {path:'list-equipement',component:ListeEquipementComponent,canActivate: [ AuthGuard ]},

    {path:'Create-Pieces' ,component:CreatePiecesComponent,canActivate: [ AuthGuard ]},
    {path:'update-Pieces/:id',component:UpdatePiecesComponent,canActivate: [ AuthGuard ]},
    {path:'View-Pieces/:id',component:ViewPiecesComponent , canActivate: [ AuthGuard ]},
    {path: 'list-Pieces',component:ListPiecesComponent,canActivate: [ AuthGuard ]},


    {path:'Create-Fournisseur' ,component:CreateFournisseurComponent,canActivate: [ AuthGuard ]},
    {path:'update-Fournisseur/:id',component:UpdateFournisseurComponent,canActivate: [ AuthGuard ]},
    {path:'View-Fournisseur/:id',component:ViewFournisseurComponent ,canActivate: [ AuthGuard ] },
    {path:'list-Fournisseur',component:ListeFournisseurComponent,canActivate: [ AuthGuard ]},

    {path:'createOrdre/:id',component:CreateOrdreComponent, canActivate: [ AuthGuard ] },
    {path:'list-Ordre',component:ListOrdreInterventionComponent,canActivate: [ AuthGuard ]},
    {path:'update-Ordre/:id',component:UpdateOrdreComponent,canActivate: [ AuthGuard ]},
    {path:'OrdreTraiter',component:OrdreTraiteComponent,canActivate: [ AuthGuard ]}, 
    {path:'OrdreNonTraiter',component:OrdreTechComponent,canActivate: [ AuthGuard ]},  
    
    {path:'Messagerie',component:MessagerieComponent,canActivate: [ AuthGuard ]}, 


    {path:'ligne',component:  ServiceComponent,canActivate: [ AuthGuard ]}, 
    {path:'create-ligne',component:CreateServiceComponent,canActivate: [ AuthGuard ]},  
    {path:'update-ligne',component:UpdateServiceComponent,canActivate: [ AuthGuard ]},  

    {path:'demande-pieces',component:RapportComponent,canActivate: [ AuthGuard ]},  

  ]
  
},

{ 
  path: '', 
  component: LayoutRegistreComponent,
  children: [
    { path: 'registre', component: RegistreComponent, pathMatch: 'full'}]
  },

// {path:'',pathMatch:'full',redirectTo:'home'},
// {path:'home',component:HomeComponent},
// // {path:'login',component:LoginComponent},
// { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]

})
export class AppRoutingModule { }
