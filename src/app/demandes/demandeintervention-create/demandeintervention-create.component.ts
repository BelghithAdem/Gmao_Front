import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ligne } from 'src/app/ligne.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-demandeintervention-create',
  templateUrl: './demandeintervention-create.component.html',
  styleUrls: ['./demandeintervention-create.component.css']
})
export class DemandeinterventionCreateComponent implements OnInit {
  Usertel:string="";
  Useradresse:string="";
  Employee: any = [];
  Ordreintervention: any = [];
  form: any = FormGroup;
  submitted = false;
  Equipement: any = [];
  Ligne: any = [];
  Userrole:string="";
  idEmployee:string="";
  checkArray:any=[];
  Po:any
  minDate :any;
  Priorite:any=['Normale','Moyenne','Elevée'];
  constructor(    private headerTitleService: HeaderTitleService,
    private notifyService : NotificationService,private Serviceapibackend: BackendApiService,
   private router: Router, private formBuilder: FormBuilder,private sessionSotragesevice:SessionstorageService) {

    this.form = this.formBuilder.group({
    checkArray: this.formBuilder.array([], [Validators.required])
  })
    } 
 
                     data: Array<any>  =[
    
                      {name:'Panne mécanique', value:'Panne mécanique'},
                      {name:'Panne électrique',  value:'Panne électrique'},
                      {name:'Panne hydraulique',  value:'Panne hydraulique'},
                      {name:'Panne pneumatique',  value:'Panne pneumatique'},
                      {name:'Panne de contrôle',  value:'Panne de contrôle'},
                      {name:'Panne de lubrification', value:'Panne de lubrification'},
                      {name:'Panne de sécurité',  value:'Panne de sécurité'},
                      {name:'Non spécifié',  value:'Non spécifié'},


                      ];
 
   ngOnInit(): void { 
     
    var iso = new Date().toISOString();
   this.minDate = iso.substring(0,iso.length-8);
    this.Userrole = this.sessionSotragesevice.get('UserRole');
    this.headerTitleService.setTitle(' LANCER DEMANDE INTERVENTION');console.log('Lancer demande intervention')

     if(this.Userrole =="employee") 
    this.form = this.formBuilder.group({
      panne: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      dureearretmachine: ['', [Validators.required]],
      priorite: ['', Validators.required],
      equipement: ['', Validators.required],
      ligne: ['', Validators.required],
     

    },
    );

    else 
    this.form = this.formBuilder.group({
      panne: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(8)]],
      dureearretmachine: ['', [Validators.required]],
      //tempstravail: ['', Validators.required],
      employee: ['', Validators.required],
      priorite: ['', Validators.required],
      // status: ['', Validators.required],
      equipement: ['', Validators.required],
      ligne: ['', Validators.required],
     

    },
    );
    this.readLigne();
    this.readEmployee();
    this.readOrdre();
     this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.Useradresse=this.sessionSotragesevice.get( 'UserAdresse');
    console.log(this.Useradresse)
    this.headerTitleService.setTitle(' Lancer une demande');console.log('Lancer une demande')
    this.idEmployee= this.sessionSotragesevice.get('UserId');
  }
   changePanne(e: any) {
    this.form.patchValue({panne: e.target.value});
    console.log("change");
   
    console.log(e.target.value)
  } 

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;


  }
//get all service
readLigne() {

  this.Serviceapibackend.AllLigne().subscribe((data: {}) => {
    this.Ligne= data;
    console.log('ligne')
    console.log(this.Ligne)
  })
}
  save() {
    console.log(this.form.value);
    this.submitted = true
    this.Po;
    if (this.form.valid) {
      if (this.Userrole=="employee"){

        this.form.value.employee=this.idEmployee     }
        else{
          this.form.value.admin=this.sessionSotragesevice.get('UserId')
        }
      this.form.value.panne=this.checkArray.join(' - ');
   
      if(this.Userrole=="admin"){
        this.Serviceapibackend.createDemandeintervention(this.form.value).subscribe(
          res => {
            console.log('Demande created successfully!');
            this.notifyService.showSuccess("Demande d'intervention créée avec succès!", "Succès");
            this.router.navigate(['/demandeNontraiter']);
            console.log(this.form.value);
          },
          error => {
            console.error('Failed to create Demande:', error);
            this.notifyService.showDanger("Une erreur s'est produite lors de la création de la demande.", "Erreur");
          }
        );
        
    }else{
      this.Serviceapibackend.createDemandeintervention(this.form.value).subscribe(
        res => {
          console.log('Demande created successfully!');
          this.notifyService.showSuccess("Demande d'intervention créée avec succès!", "Succès");
          this.router.navigate(['/DemandeNontraiter']);
          console.log(this.form.value);
        },
        error => {
          console.error('Failed to create Demande:', error);
          this.notifyService.showDanger("Une erreur s'est produite lors de la création de la demande.", "Erreur");
        }
      );
      
      }

   } 
   else {
    this.notifyService.showDanger("erreur  !!","Vérifier les champs vide")
      console.log(this.form)
    } 
  }
  
  readEmployee() {

    this.Serviceapibackend.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
      console.log('service employee')
      console.log(this.Employee)
    })
  }
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
        console.log(this.Equipement)
      })
  
  
    }
    changePriorite(e:any){
      console.log("priorite",e.value)
      this.Po=e
    }

    

loadEquipement(e:any){
  this.Serviceapibackend.getEquipementByLigne(e.target.value).subscribe((data: {}) => {
    console.log(data)
    console.log('service ordre')
    this.Equipement=data
   })
}

onCheckboxChange(e:any) {
if (e.target.checked) {
  this.checkArray.push(e.target.value);
} else {
  let i: number =   this.checkArray.findIndex((el:any) => el ==  e.target.value)
   this.checkArray.splice(i,1)
 
 
}
console.log(this.checkArray)
}
}
