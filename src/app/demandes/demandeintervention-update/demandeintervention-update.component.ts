import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { Employee } from 'src/app/employee.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-demandeintervention-update',
  templateUrl: './demandeintervention-update.component.html',
  styleUrls: ['./demandeintervention-update.component.css']
})
export class DemandeinterventionUpdateComponent implements OnInit {
 

Usertel:string="";
  Useradresse:string="";
  Employee: any = [];
  Ordreintervention: any = [];
  form: any = FormGroup;
  submitted = false;
  Equipement: any = [];
  Ligne: any = [];
  Userrole:string="";
  message="";
  minDate:any;
  idEmployee:string="";
  checkArray:Array<String>=[];
  
  data:  any  =[
    {name:'Panne mécanique', value:'Panne mécanique',check:false},
    {name:'Panne électrique',  value:'Panne électrique',check:false},
    {name:'Panne hydraulique',  value:'Panne hydraulique',check:false},
    {name:'Panne pneumatique',  value:'Panne pneumatique',check:false},
    {name:'Panne de contrôle',  value:'Panne de contrôle',check:false},
    {name:'Panne de lubrification', value:'Panne de lubrification',check:false},
    {name:'Panne de sécurité',  value:'Panne de sécurité',check:false},
    {name:'Non spécifié',  value:'Non spécifié',check:false},
    ];
    
  demandeIntervention:any=Demandeintervention
  //  message=" ";
  Priorite:any=['Normale','Moyenne','Elevée'];
  constructor(    private headerTitleService: HeaderTitleService,
    private notifyService : NotificationService,private Serviceapibackend: BackendApiService,
   private router: Router,private actRoute: ActivatedRoute, private formBuilder: FormBuilder,private sessionSotragesevice:SessionstorageService) {

    this.form = this.formBuilder.group({
    checkArray: this.formBuilder.array([], [Validators.required])
  })


  var id = this.actRoute.snapshot.paramMap.get('id');
  this.Serviceapibackend.ShowDemandebyId(id).subscribe ( (data => {
    this.demandeIntervention=data;
    data.ligne=data.equipement.ligne;
    this.loadEquipementbyId(data.equipement.ligne)
    data.equipement=data.equipement.id;
    /************Mr err ici id de employee */
    if(this.Userrole =="employee || admin") {
    data.employee=data.employee.id
    }
    var listTache=data.panne.split(' - ')
    this.checkArray=listTache;

  var dx=  this.data.map((elem:any) => {

      let res =listTache.filter((el:any)=>{
        return elem.value==el

      })
      if (res.length != 0) {
        elem.check=true;
        return  elem
      } else {
        return elem
      }

    })
this.data=dx;

    this.form.patchValue({...data}); 
    console.log("cxxxxxxxxxxxxxxxx");
    console.log(listTache);
    console.log(data);
    if(this.Userrole =="employee") {
  this.form = this.formBuilder.group({
    
    panne: [data.panne],
    date: [data.date],
    description: [data.description],
    dureearretmachine: [data.dureearretmachine],
    priorite: [data.priorite],
    equipement: [data.equipement], 
    ligne: [data.ligne] })
  

 } else 
  this.form = this.formBuilder.group({
    panne:[data.panne,Validators.required],
    date: [data.date,Validators.required],
    description:  [data.description,Validators.required],
    dureearretmachine:[data.dureearretmachine,Validators.required],
    employee: [data.employee.id,Validators.required],
    priorite: [data.priorite,Validators.required],
    equipement: [data.equipement,Validators.required], 
    ligne: [data.ligne,Validators.required] 
  })
  })

  )}
 
 
   ngOnInit(): void { 
    var iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8);
    this.updateForm();
    this.Userrole = this.sessionSotragesevice.get('UserRole');
    this.readLigne();
    this.readEmployee();
    this.readOrdre();
     this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.Useradresse=this.sessionSotragesevice.get( 'UserAdresse');
    console.log(this.Useradresse)
    this.headerTitleService.setTitle('MISE A JOUR DEMANDE INTERVENTION');console.log(' Mise a jour une demande')
    this.idEmployee= this.sessionSotragesevice.get('UserId');
  }
   changePanne(e: any) {
    //this.form.patchValue({panne: e.target.value});
    console.log("change");
   
    console.log(e.target.value)
  } 

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;


  }
  updateForm(){
    
    this.form = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: [''],
      adresse: [''],
      tel: [''],
      panne:[''],
      date: [''],
      description:  [''],
      dureearretmachine:[''],
      employee: [''],
      priorite: [''],
      equipement: [''], 
      ligne: [''] 


    })    
  }
readLigne() {

  this.Serviceapibackend.AllLigne().subscribe((data: {}) => {
    this.Ligne = data;
    console.log('ligne')
    console.log(this.Ligne)
  })
}
submitForm(){
  console.log(this.form.value);
  this.submitted = true
  if (this.form.valid) {
    if (this.Userrole=="employee"){

      this.form.value.employee=this.idEmployee     }
      else{
        this.form.value.admin=this.sessionSotragesevice.get('UserId')
          }
    this.form.value.panne=this.checkArray.join(' - ');
  if(this.Userrole=="admin"){
  var id = this.actRoute.snapshot.paramMap.get('id');
  console.log(this.form.value);
this.Serviceapibackend.updateDemande(id, this.form.value).subscribe(
  data => {
    this.demandeIntervention = data;
    this.notifyService.showSuccess("Demande d'intervention mise à jour avec succès!", "Succès");
    this.form.patchValue({...data});
    console.log(data);
    console.log(this.form.value);
    this.message = "Demande mise à jour";
    this.router.navigate(['/demandeNontraiter']);
    console.log(data);
  },
  error => {
    console.error('Failed to update Demande:', error);
    this.notifyService.showDanger("Une erreur s'est produite lors de la mise à jour de la demande.", "Erreur");
  }
);

}else{
  var id = this.actRoute.snapshot.paramMap.get('id');
  console.log(this.form.value);
  this.Serviceapibackend.updateDemande(id, this.form.value).subscribe(
    data => {
      this.demandeIntervention = data;
      this.form.patchValue({...data});
      this.notifyService.showSuccess("Demande d'intervention mise à jour avec succès!", "Succès");
      console.log(data);
      console.log(this.form.value);
      this.message = "Demande mise à jour";
      this.router.navigate(['/demandeNontraiter']);
      console.log(data);
    },
    error => {
      console.error('Failed to update Demande:', error);
      this.notifyService.showDanger("Une erreur s'est produite lors de la mise à jour de la demande.", "Erreur");
    }
  );
  
}
}
else{
  console.log(this.form.valid);
  this.notifyService.showDanger("erreur  !!","verifier les champs vide")
}
}
  
  readEmployee() {

    this.Serviceapibackend.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
      console.log('service employee')
      console.log(this.Employee)
    })
  }
  //get all ordre intervention
  readOrdre() {
    this.Serviceapibackend.getOrdre().subscribe((data: {}) => {
      this.Ordreintervention = data;
      console.log('service ordre')
      console.log(this.Ordreintervention)
    })


  }
    //get all Equipement 
    readEquipement() {
      this.Serviceapibackend.AllEquipement().subscribe((data: {}) => {
        this.Equipement = data;
        console.log('service Equipement')
        //alert('service ordre chbik matemchich :( ')
  
        console.log(this.Equipement)
      })
    }
    changePriorite(e:any){
      console.log(e.value)
      this.priorite.setValue(e.target.value, {
        onlySelf: true
      })
    }

get priorite(){
  return this.form.get('priorite');

}
selectLigne(e:any){
  this.form.patchValue(e.target.value); 
}

loadEquipement(e:any){
  //alert(e.target.value)
  this.Serviceapibackend.getEquipementByLigne(e.target.value).subscribe((data: {}) => {
    console.log(data)
    console.log('service ordre')
    this.Equipement=data


   })
}
loadEquipementbyId(e:any){
  //alert(e.target.value)
  this.Serviceapibackend.getEquipementByLigne(e).subscribe((data: {}) => {
    console.log(data)
    console.log('service ordre')
    this.Equipement=data


   })
}
onCheckboxChange(e:any) {

alert(e.target.value)
if (e.target.checked) {
  this.checkArray.push(e.target.value);

} else {
  let i: number = 0;
  this.checkArray=this.checkArray.splice(i,1)
  this.checkArray.map(item =>  item != e.target.value)
}
console.log(this.checkArray)
}
}
