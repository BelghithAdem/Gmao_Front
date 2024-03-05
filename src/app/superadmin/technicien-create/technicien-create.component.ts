import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-technicien-create',
  templateUrl: './technicien-create.component.html',
  styleUrls: ['./technicien-create.component.css']
})
export class TechnicienCreateComponent implements OnInit {
  Ligne: any = [];

  @Input() UserDetails = { nom: '',prenom:'', email: '',specialite:'', adresse:'',tel:''}

  form:any= FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private notifyService : NotificationService,
    private Serviceapibackend: BackendApiService,
    private router: Router,private formBuilder: FormBuilder) { 
     
    }
    

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel:['', Validators.required],
      specialite: ['', Validators.required],
      adresse: ['', Validators.required],
      ligne: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
  },
  );
  this.readLigne();
  }


// convenience getter for easy access to form fields
get f() { return this.form.controls; }

submit() {
  if (this.form.valid){
  console.log(this.form.value);
  this.Serviceapibackend.createTechnicien(this.form.value).subscribe(
    res => {
      console.log('Technicien created successfully!');
      this.router.navigate(['/technicien']);
      this.notifyService.showSuccess("Bien créé", "Technicien");
    },
    error => {
      console.error('Failed to create Technicien:', error);
      this.notifyService.showDanger("Une erreur s'est produite lors de la création du Technicien.", "Erreur");
    }
  );
  
}
else{
  console.log(this.form.valid);
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
