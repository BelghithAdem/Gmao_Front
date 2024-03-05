import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  form:any= FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private notifyService : NotificationService,
        private Serviceapibackend:BackendApiService,

    private router: Router,private formBuilder: FormBuilder) { 
     
    }
    

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      nom_ligne: ['', Validators.required],
  
  },
  );
  }
// convenience getter for easy access to form fields
get f() { return this.form.controls; }

submit() {
  console.log(this.form.value);
  if (this.form.valid){
    this.Serviceapibackend.createLigne(this.form.value).subscribe(
      res => {
        console.log('Ligne created successfully!');
        this.router.navigate(['/ligne']);
        this.notifyService.showSuccess("Ligne créée avec succès!", "Succès");
      },
      error => {
        console.error('Failed to create Ligne:', error);
        this.notifyService.showDanger("Une erreur s'est produite lors de la création de la ligne.", "Erreur");
      }
    );    
    }
      else{
        this.notifyService.showDanger("erreur  !!","verifier les champs vide")
  
  
      }
}

}
