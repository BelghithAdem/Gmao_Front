import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Intervention } from 'src/app/intervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { IDropdownSettings,NgMultiSelectDropDownModule
} from 'ng-multiselect-dropdown';
import { PiecesRechange } from 'src/app/pieces-rechange.model';
import * as moment from 'moment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
   selector: 'app-intervention-create',
  templateUrl: './intervention-create.component.html',
  styleUrls: ['./intervention-create.component.css'],

})
export class InterventionCreateComponent implements OnInit {
  closeModal:any ;
  form: any = FormGroup;
  Usertel:string="";
  Useradresse:string="";
  submitted = false;
  etatin:any ="";
  Technicien: any = [];
  Ordre: any = [];
  Degre:any=['primaire','secondaire '];
  dropdownList:any = [];
  selectedItems:any = [];
  Equipement:any=[];
  id:any;
  intervention:any= Intervention;
  Ordreintervention:any=[];
  ordreintervention:any=Ordreintervention;
  Intervention:any=[]
  Userrole:string="";
  idTechnicien:string="";
  minDate :any;
  dropdownSettings:IDropdownSettings = {
  singleSelection: false,
  idField: 'item_id',
  textField: 'item_text',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 3,
  allowSearchFilter: true,
    };
  public show_div : boolean = false;
  PiecesRechange:any=[];
  constructor(  private modalService: NgbModal ,private notifyService : NotificationService,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder,private sessionSotragesevice:SessionstorageService,private Serviceapibackend: BackendApiService,) { }

  ngOnInit(): void {

  this.updateForm();
  this.Serviceapibackend.AlPiecesRechange().subscribe((data: any) => {
    let list=[]

  
    for (let x = 0; x < data.length; x++) {

      const element = data[x];
      
      list.push({item_id:element.id,item_text:element.nom_piece+" | "+element.ref_piece})

      if(x==data.length-1) {

        this.dropdownList=list;
      }
    }
  })

    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getOrdreintervention(id).subscribe((data: Ordreintervention) => {
      console.log(data);
      this.ordreintervention = data; 
      
       })

    var iso = new Date().toISOString();
   this.minDate = iso.substring(0,iso.length-8);
 
    this.form = this.formBuilder.group({
      date_debut: ['', Validators.required],
      observation: ['', Validators.required],
      description: this.formBuilder.array([]),

    },
    );
    this.addTache()
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.idTechnicien= this.sessionSotragesevice.get('UserId');
  }

 get f() {
  return this.form.controls;


}
/****** Array list tache *******/
description():FormArray{
   return this.form.get("description")as FormArray
 }
addTache() {
   var x= this.form.get('description') as FormArray ;
   x.push(this.formBuilder.group({
     tache:'',
     date:'',
     nom_piece:'',
     quantite:'',
   })) 
}
removeTache(index:any) {
  ( this.form.get('description') as FormArray).removeAt(index);
}
Save() {
  if (this.form.valid){
    console.log(this.form.value);
    this.submitted = true;
    this.form.value.demandein=this.ordreintervention.demandeintervention.id
    this.form.value.ordreintervention=this.route.snapshot.paramMap.get('id');
    this.form.value.equipement=this.ordreintervention.demandeintervention.equipement;
    this.form.value.etat=this.etatin;
      this.Serviceapibackend.createIntervention(this.form.value).subscribe(res => {
        console.log(' intervention created successfully!');
        console.log(this.form.value)
        this.router.navigate(['/list-intervention'])
        this.notifyService.showSuccess("Intervention  !!","bien crée")
      })
    }
    else{
      console.log(this.form.valid);
      this.notifyService.showDanger("erreur  !!","verifier les champs vide")
    }

}
changeEtat(e:any) {
  console.log(e.value)
  this.etat.setValue(e.target.value, {
    onlySelf: true
  })

}
get etat(){
  return this.form.get('degre_urgence');
}

changeEat(e: any) {
  console.log("change");
  this.etatin=e.target.value;
  console.log(e.target.value)
} 
toggle() {
this.show_div = !this.show_div;
}
updateForm(){
  this.form = this.formBuilder.group({
    debutprevu: [''],
    dateestimation: [''],
   
   
  })    
}
diff(){


}


submit(){
  console.log(this.form.value);
  if (this.form.valid){
    this.form.value.intervention=this.route.snapshot.paramMap.get('id');

    this.Serviceapibackend.createDemandedePiece(this.form.value).subscribe(
      res => {
        console.log('demande de pieces created successfully!');
        console.log(this.form.value.intervention);
        this.notifyService.showSuccess("Demande de pièces créée avec succès!", "Succès");
        // Autres instructions à exécuter après la création réussie de la demande de pièces
      },
      error => {
        console.error('Failed to create demande de pieces:', error);
        this.notifyService.showDanger("Une erreur s'est produite lors de la création de la demande de pièces.", "Erreur");
      }
    );
    
    }
      else{
        this.notifyService.showDanger("demande de pieces   !!","verifier les champs vide")
  
  
      }
     
}
triggerModal(content:any,id:any) {
  this.id=id;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}
  obj(id: any, obj: any) {
    throw new Error('Method not implemented.');
  }
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
}
