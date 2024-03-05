import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { Technicien } from 'src/app/technicien.model';

@Component({
  selector: 'app-technicien-update',
  templateUrl: './technicien-update.component.html',
  styleUrls: ['./technicien-update.component.css']
})
export class TechnicienUpdateComponent implements OnInit {

  message="";
  id: any;
  technicien:any= Technicien;
  updateTechnicienForm:any= FormGroup;
  Ligne: any = [];
  passwordVisible = false;


  constructor(    private Serviceapibackend: BackendApiService,
    private notifyService : NotificationService, 
                private router: Router, 
                public fb: FormBuilder,
                private actRoute: ActivatedRoute) 
                {

                               
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.Serviceapibackend.getTechnicien(id).subscribe((data) => {
      console.log(data);
    this.updateTechnicienForm = this.fb.group({
        nom: [data.nom, Validators.required],
        prenom: [data.prenom, Validators.required],
        specialite: [data.specialite, Validators.required],
        email: [data.email,[Validators.required, Validators.email]],
        adresse: [data.adresse, Validators.required],
        tel:[data.tel, Validators.required],
        ligne:[data.ligne.id, Validators.required],
        password: [data.password, Validators.required] })
   }) }
   togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  ngOnInit(): void {
    this.readLigne();

    this.updateForm()
  }
  updateForm(){
    
    this.updateTechnicienForm = this.fb.group({
      nom: [''],
      prenom: [''],
      specialite: [''],
      email: [''],
      password: [''],
      adresse: [''],
      tel: [''],
      ligne: ['']

    })    
  }
  submitForm(){
    if (this.updateTechnicienForm.valid){

    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.updateTechnicienForm.value);
    this.Serviceapibackend.updateTechnicien(id, this.updateTechnicienForm.value).subscribe(
      data => {
        this.technicien = data;
        this.updateTechnicienForm.patchValue(data);
        this.message = "Technicien was updated";
        this.router.navigate(['/technicien']);
        this.notifyService.showSuccess("Technicien modifié avec succès!", "Technicien");
      },
      error => {
        console.error('Failed to update Technicien:', error);
        this.notifyService.showDanger("Une erreur s'est produite lors de la mise à jour du Technicien.", "Erreur");
      }
    );
    
}
else{
  this.notifyService.showDanger("erreur  !!","verifier les champs vide")


}
}
//get all service
readLigne() {

  this.Serviceapibackend.AllLigne().subscribe((data: {}) => {
    this.Ligne = data;
    console.log('ligne')
    console.log(this.Ligne)
  })
}
}
