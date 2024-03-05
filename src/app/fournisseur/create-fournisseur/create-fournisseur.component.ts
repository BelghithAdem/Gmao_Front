import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-create-fournisseur',
  templateUrl: './create-fournisseur.component.html',
  styleUrls: ['./create-fournisseur.component.css']
})
export class CreateFournisseurComponent implements OnInit {

  form:any= FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private notifyService : NotificationService,
    private Serviceapibackend: BackendApiService,
    private router: Router,private formBuilder: FormBuilder) { 
     
    }
    

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],  
      adresse: ['', Validators.required],
      tel: ['', Validators.required],

  },
  );
  }
get f() { return this.form.controls; }

submit() {
 if (this.form.valid) {

  this.Serviceapibackend.createFournisseur(this.form.value).subscribe(
    res => {
      console.log('Fournisseur created successfully!');
      this.router.navigate(['/list-Fournisseur']);
      console.log(this.form.value);
      this.notifyService.showSuccess("Fournisseur créé avec succès!", "Succès");
    },
    error => {
      console.error('Failed to create Fournisseur:', error);
      this.notifyService.showDanger("Une erreur s'est produite lors de la création du fournisseur.", "Erreur");
    }
  );
  
}
 else{
   this.notifyService.showDanger("erreur  !!","verifier les champs vide")
 }
}
}
