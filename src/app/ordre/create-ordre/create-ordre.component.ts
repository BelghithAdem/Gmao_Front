import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { Intervention } from 'src/app/intervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-create-ordre',
  templateUrl: './create-ordre.component.html',
  styleUrls: ['./create-ordre.component.css']
})
export class CreateOrdreComponent implements OnInit {
  form: any = FormGroup;
  Usertel:string="";
  Useradresse:string="";
  submitted = false;
  Technicien: any = [];
  Equipement: any = [];
  de:any;
  du:any;
  idTech:string =""; 
  Dateestimation:any= ['Heurs','Jours'] ;
  Degre:any=['Normale','Moyenne','Elevée'];
  minDate:any;
  finprevu:any
  debutprevu:any
  dateestimation:any
  id:any;
  ordreintervention:any= Ordreintervention;
  demandeintervention:any=Demandeintervention;
  Demandeintervention:any=[];
  idadmin:any;
  Userrole:string="";
  Ordreintervention:any=[];
  intervention:any;
  Intervention:any=[];
  NBOrdre:any=0;
  public show_div : boolean = false;
  constructor( private notifyService : NotificationService,
    private router: Router,private formBuilder: FormBuilder,private sessionSotragesevice:SessionstorageService,
    private Serviceapibackend: BackendApiService,private route: ActivatedRoute) {
   
  
     }

  ngOnInit(): void {

    
    var iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8);
  
    var id = this.route.snapshot.paramMap.get('id');
   this.idTech= this.route.snapshot.paramMap.get('idTech') || "";
  //  alert(id)
    this.Serviceapibackend.getDemandeintervention(id).subscribe((data: Demandeintervention) => {
      this.demandeintervention = data; 
      console.log('get intervention by id');
      this.form = this.formBuilder.group({
        description:[data.description, Validators.required],
        degre_urgence: [data.priorite, Validators.required],
        technicien: ['', Validators.required],
        debutprevu: ['', Validators.required],
        dateestimation: ['', Validators.required],
        reparation: ['', Validators.required],
      })
      console.log(data);
    })
 
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.Useradresse=this.sessionSotragesevice.get( 'UserAdresse');
    console.log(this.Useradresse)
    this.readTechnicien();
    this.getEquipement();
    this.updateForm();
   
  }
  selectEat(e:any){
    this.show_div  =true
  
    this.Stat(e.target.value)
    this.Serviceapibackend.getInterventionByTechnicienFromDay(e.target.value).subscribe((data:{}) => {
      this.Ordreintervention = data; 
      console.log(data);
     }) 
  }
  
  
 get f() {
  return this.form.controls;


}

updateForm(){
    
  this.form = this.formBuilder.group({
    priorite: [''],
    panne:[''],
    reparation:[''],
    debutprevu:[''],
    technicien:[''],

  })   } 
getEquipement(){
  
  this.Serviceapibackend.AllEquipement().subscribe((data: {}) => {
    this.Equipement = data;
    console.log('service Equipement')
    console.log(this.Equipement)
  })
  
}
  readTechnicien() {

    this.Serviceapibackend.getTechniciens().subscribe((data: any) => {
      this.Technicien = data;

    let s=  data.map((el:any) => {

      if (el.id != this.idTech)
      return el
      else 
      return null

    })
    this.Technicien=s.filter((item:any) => item )
      console.log('service getTechniciens')
      console.log(this.Technicien)
    })
  }
save() {
  
 if (this.form.valid) {
    console.log(this.form.value);
    this.submitted = true
    this.du;
    this.form.value.finprevu=this.finprevu;
    this.form.value.nature_de_travaux=this.demandeintervention.panne;
    this.form.value.dateestimation=this.form.value.dateestimation +' '+ this.de;
     this.form.value.demandeintervention=this.route.snapshot.paramMap.get('id');
     this.Serviceapibackend.createOrdreintervention(this.form.value).subscribe(
      res => {
        console.log(this.form.value);
        this.router.navigate(['/list-Ordre']);
        this.notifyService.showSuccess("Ordre d'intervention créé avec succès!", "Succès");
      },
      error => {
        console.error('Failed to create Ordre:', error);
        this.notifyService.showDanger("Une erreur s'est produite lors de la création de l'ordre.", "Erreur");
      }
    );
    
  }
  else {
      this.notifyService.showDanger("erreur  !!","verifier les champs vide")
        console.log(this.form)
      }
}



changeCity(e:any) {
  console.log("degre urgence",e)
  console.log( e)

  this.du=e
 
 
}
changeDateEstim(e:any) {
  console.log("Période de fin de réparation",e ) 
  console.log( e)
  this.de=e ;
  this.calculerFinPrevu()
}
 
calculerFinPrevu() {

  console.log( this.form.value.debutprevu)
  this.form.value.debutprevu = new Date(this.form.value.debutprevu);

  if (! this.form.value.debutprevu|| !( this.form.value.debutprevu instanceof Date)) {
    console.log('La date de début prévue est manquante ou incorrecte.',this.debutprevu);
    return;
  }

  if (typeof this.form.value.dateestimation !== 'number') {
    console.log('La durée estimée doit être un nombre.');
    return;
  }

  if (this.de === 'Jours') {
    const dureeEnMs = this.form.value.dateestimation * 24 * 60 * 60 * 1000;
    this.finprevu = this.formatDate(new Date( this.form.value.debutprevu.getTime() + dureeEnMs));
  } else {
    const dureeEnMs = this.form.value.dateestimation * 60 * 60 * 1000;
    this.finprevu =this.formatDate( new Date( this.form.value.debutprevu.getTime() + dureeEnMs));
  }

  console.log(this.finprevu);
}
 formatDate(date:any) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}




 
//  getFormatedDate(date: Date, format: string) {
//       const datePipe = new DatePipe('en-US');
//       return datePipe.transform(date, format);
//     } 
    
Stat(i:string){

  this.Serviceapibackend.getCountOrdre(i).subscribe((data: any) => {
    console.log('service Count Ordreintervention ')
    this.NBOrdre=data.totalOrdre;

    console.log(this.NBOrdre)
  })
  
}
    

}
