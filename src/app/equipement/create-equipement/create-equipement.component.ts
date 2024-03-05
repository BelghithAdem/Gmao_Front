import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-create-equipement',
  templateUrl: './create-equipement.component.html',
  styleUrls: ['./create-equipement.component.css']
})
export class CreateEquipementComponent implements OnInit {
  images : string[] = [];
  form:any= FormGroup;
  submitted = false;
  selectedFile : any;
  selectedImage:any;
  Equipement:any=[];
  Ligne:any=[];
  // Etatequipement:any=[];
   progress: number=0;
  message: any;
  minDate:any;
  Etatequipement:any=['En marche','Sous maintien','Hors service'];

  constructor(private fb: FormBuilder,  private notifyService : NotificationService,
    private Serviceapibackend: BackendApiService,
    private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    var iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8); 

    this.form = this.formBuilder.group({
      libelle: ['', Validators.required],
      numero_model: ['', Validators.required],
      numero_serie: ['', Validators.required],
      marque: ['', Validators.required],
      date_en_service: ['', Validators.required],
      image: ['', Validators.required],
      ligne: ['', Validators.required],


  },
  );
  this. readLigne();
  // this. readEtatEquipement();

  }
// convenience getter for easy access to form fields
get f() { return this.form.controls; }

submit() {
 if (this.form.valid) {
  const file: File  = this.selectedFile[0];
  var formPost: any = new FormData();

  var  dtx ={
 
     "libelle":this.form.value.libelle,
     "numero_model":this.form.value.numero_model, 
     "marque":this.form.value.marque,
     "date_en_service":this.form.value.date_en_service,
     "ligne":this.form.value.ligne,
     "numero_serie":this.form.value.numero_serie,
     image:''
    }
   console.log(dtx)
   formPost.append('file', file);
 // formPost.set("datax",JSON.stringify(dtx));
 this.Serviceapibackend.upload( formPost).subscribe(
  (event: any) => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round(100 * event.loaded / event.total);
      console.log(this.progress) 
    } else if (event instanceof HttpResponse) {
      this.message = event.body.message;
      console.log(this.message)
      console.log('image equipement uploaded successfully!');
      dtx.image=event.body.fileName


      this.Serviceapibackend.createEquiement(dtx).subscribe(res => {
        this.notifyService.showSuccess(" Bien crée ","Equipement")
        this.router.navigate(['/list-equipement'])
      })
    }
    else {
      
       console.log(this.form)
   }
  
  },
  (err: any) => {

    console.log(err);
    this.progress = 0;
    if (err.error && err.error.message) {
      this.message = err.error.message;
      this.notifyService.showDanger("erreur  !!","problém upload ! check again !")

    } else {
      this.message = 'Could not upload the file!';
      this.notifyService.showDanger("erreur  !!","problém upload ! check again !")

    }

  
  });


  } else  {
    this.notifyService.showDanger("erreur  !!","verifier les champs vide")

  }

  
//console.log(file,this.form.value)
  }

//getService
 readLigne() {

  this.Serviceapibackend.AllLigne().subscribe((data: {}) => {
    this.Ligne = data;
    console.log('ligne')
    console.log(this.Ligne)
  })
}

//get all Etat Equipement
// readEtatEquipement(){
//  this.Serviceapibackend.AllEtatequipement().subscribe((data: {}) => {
//     this.Etatequipement = data;
//     console.log('service Etat equipement')
//     console.log(this.Etatequipement)
//   }) 
// }
//method which gets called when a file is selected by the user
onFileChange(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    this.selectedFile = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile[0]);
    reader.onload = (event) => {
      this.selectedImage = (<FileReader>event.target).result;
    };
  }
}





  changeetatequipements(e:any){
    console.log(e.value)
    this.etatequipements.setValue(e.target.value, {
      onlySelf: true
    })
  }
    // Getter method to access formcontrols

get etatequipements(){
return this.form.get('etatequipements');

}
 
}
