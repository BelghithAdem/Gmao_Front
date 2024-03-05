import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { HeaderTitleService } from '../../services/header-title.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-createpreventive',
  templateUrl: './createpreventive.component.html',
  styleUrls: ['./createpreventive.component.css']
})
export class CreatepreventiveComponent implements OnInit {
  form: any = FormGroup;
  submitted = false;
  Equipement: any = [];
  Ligne: any = [];
  
constructor( private fb: FormBuilder,private headerTitleService: HeaderTitleService,private Serviceapibackend:BackendApiService, 
  private router:Router,private formBuilder: FormBuilder,private notifyService :NotificationService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Historique');console.log('Historique')
    this.readLigne()


    this.form = this.formBuilder.group({
      equipement: ['', Validators.required],
      tache: ['', Validators.required],
     interval: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(8)]],
     
  
    },
    );
  }


 

  loadEquipement(e:any){
    this.Serviceapibackend.getEquipementByLigne(e.target.value).subscribe((data: {}) => {
      console.log(data)
      console.log('service ordre')
      this.Equipement=data
     })
  }
  readLigne() {

    this.Serviceapibackend.AllLigne().subscribe((data: {}) => {
      this.Ligne= data;
      console.log('ligne')
      console.log(this.Ligne)
    })
  }
   save(){
this.submitted=true
console.log(this.form.value)
if (this.form.valid) {
console.log(this.form.value)
this.Serviceapibackend.createPreventive(this.form.value).subscribe(
  res => {
    this.notifyService.showSuccess("Prévention créée avec succès!", "Succès");
    this.router.navigate(['/list']);
    console.log(this.form.value);
    // Autres instructions à exécuter après la création réussie de la prévention
  },
  error => {
    console.error('Failed to create preventive:', error);
    this.notifyService.showDanger("Une erreur s'est produite lors de la création de la prévention.", "Erreur");
  }
);

}
else{
  this.notifyService.showDanger("erreur  !!","Vérifier les champs vide")


}


   }









   get f() { return this.form.controls; }




 

}
