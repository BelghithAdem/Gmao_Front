import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipement } from 'src/app/equipement.model';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-update-equipement',
  templateUrl: './update-equipement.component.html',
  styleUrls: ['./update-equipement.component.css']
})
export class UpdateEquipementComponent implements OnInit {
  Equipement:any=[];
  Ligne:any = [];
  message="";
  id: any;
  equipement:any= Equipement;
  updateForm:any= FormGroup;
  Etatequipement:any=[]
  progress:number=0;
  selectedFile : any =[];
  DataGlob:any;
  url:any='http://127.0.0.1:1337/images/';
  minDate:any;
  constructor( private Serviceapibackend: BackendApiService,private notifyService : NotificationService,
                private router: Router, 
                public fb: FormBuilder,
                private actRoute: ActivatedRoute) 
                {

                  
     }
  ngOnInit(): void {
   
    var iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8); 

    this.updatePieceForm();
    this.readEtatEquipement();
    this.readLigne();


    var id = this.actRoute.snapshot.paramMap.get('id');
    this.Serviceapibackend.getEquipementById(id).subscribe((data) => {
      //alert("appel")
      console.log(data);
      this.DataGlob=data;
      this.url=this.url+data.image;

    this.updateForm = this.fb.group({
      libelle: [data.libelle, Validators.required],
      numero_model: [data.numero_model, Validators.required],
      numero_serie: [data.numero_serie, Validators.required],
      marque: [data.marque, Validators.required],
      date_en_service: [data.date_en_service, Validators.required],
      etatequipements: [data.etatequipements[0].id, Validators.required],
      ligne: [data.ligne.id, Validators.required],
      image: [data.image, Validators.required],
     })
   })
  }
  updatePieceForm(){
    
    this.updateForm = this.fb.group({
      libelle: [''],
      numero_model: [''],
      numero_serie: [''],
      marque: [''],
      date_en_service: [''],
      etatequipements: [''],
      ligne: [''],
      date_hors_service: [''],
      image: [''],
     


    })    
  }
  submit(){
  // if (this.updateForm.valid) {
console.log("this.selectedFile[0]")
console.log(this.selectedFile)
if (this.selectedFile.length == 0) {

  let  dtx ={
   
    "libelle":this.updateForm.value.libelle,
    "numero_model":this.updateForm.value.numero_model, 
    "marque":this.updateForm.value.marque,
    "date_en_service":this.updateForm.value.date_en_service,
    "ligne":this.updateForm.value.ligne,
    "etatequipements":this.updateForm.value.etatequipements,
    "intervention":this.updateForm.value.intervention,
    "numero_serie":this.updateForm.value.numero_serie,
    image:this.DataGlob.image,
  }
  var id = this.actRoute.snapshot.paramMap.get('id');
  console.log(this.updateForm.value);
  this.Serviceapibackend.updateEquipement(id,dtx).subscribe(data => {
    this.equipement=data;
    this.updateForm.patchValue(data);
    this.message="Equipement was updated";
    this.router.navigate(['/list-equipement']);


  })

}else {
  const file: File  = this.selectedFile[0];
    var formPost: any = new FormData();
    let  dtx ={
   
       "libelle":this.updateForm.value.libelle,
       "numero_model":this.updateForm.value.numero_model, 
       "marque":this.updateForm.value.marque,
       "date_en_service":this.updateForm.value.date_en_service,
       "ligne":this.updateForm.value.ligne,
       "etatequipements":this.updateForm.value.etatequipements,
       "intervention":this.updateForm.value.intervention,
       "numero_serie":this.updateForm.value.numero_serie,
       image:'',
     }
     console.log(dtx)
     formPost.append('file', file);
   
   
  
  
  
  
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

          var id = this.actRoute.snapshot.paramMap.get('id');
          console.log(this.updateForm.value);
          this.Serviceapibackend.updateEquipement(id,dtx).subscribe(data => {
            this.equipement=data;
            console.log('tttttttttttttest1');
           
            console.log(data);

            this.updateForm.patchValue(data);
            console.log('tttttttttttttest222');

            console.log(this.updatePieceForm);
            this.message="Equipement was updated";
            this.router.navigate(['/list-equipement']);
            console.log(data);
            this.notifyService.showSuccess(" Bien modifier ","Equipement")

  
          })
  
         }
      },
      (err: any) => {
   
        console.log(err);
        this.progress = 0;
  
        if (err.error && err.error.message) {
          this.message = err.error.message;

        } else {
          this.message = 'Could not upload the file!';

        }
   
    
      
      });
    }

 
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
readEtatEquipement(){
  this.Serviceapibackend.AllEtatequipement().subscribe((data: {}) => {
     this.Etatequipement = data;
     console.log('service Etat equipement')
     console.log(this.Etatequipement)
   }) 
 }
//method which gets called when a file is selected by the user
onFileChange(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    this.selectedFile = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile[0]);
    reader.onload = (event) => {
      this.url = (<FileReader>event.target).result;
    };
  }
}                              



}
