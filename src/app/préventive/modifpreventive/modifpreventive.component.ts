import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { HeaderTitleService } from '../../services/header-title.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { Preventive } from 'src/app/preventive.model';
@Component({
  selector: 'app-modifpreventive',
  templateUrl: './modifpreventive.component.html',
  styleUrls: ['./modifpreventive.component.css']
})
export class ModifpreventiveComponent implements OnInit {
  Intervention:any=[];
  intervention:any;
  tableSize = 6;
  tableSizes = [ 3, 6, 12];
  page = 1;
  count = 0;
  form: any = FormGroup;
  submitted = false;
  Equipement: any = [];
  Ligne: any = [];
  id:any
  preventive :any=Preventive;
  Updateform:any= FormGroup;

  
constructor( private fb: FormBuilder,private headerTitleService: HeaderTitleService,private Serviceapibackend:BackendApiService, 
  private router:Router,private formBuilder: FormBuilder,private notifyService :NotificationService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Historique');console.log('Historique')
    this.readLigne()
    this.findbyid()


    this.form = this.formBuilder.group({
      equipement: ['', Validators.required],
      tache: ['', Validators.required],
      interval: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(8)]],
     
  
    },
    );
    this.updateForm()
  }

  updateForm(){
    
    this.Updateform = this.fb.group({
      equipement: [''],
      tache: [''],
      interval: [''],
      description: [''],
    })    
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
update(){
this.submitted=true
if (this.Updateform.valid) {
  this.Serviceapibackend.updatepreventive(this.id, this.Updateform.value).subscribe(
    res => {
      this.notifyService.showSuccess("Prévention modifiée avec succès!", "Succès");
      this.router.navigate(['/list']);
      console.log(this.Updateform.value);
      // Autres instructions à exécuter après la modification réussie de la prévention
    },
    error => {
      console.error('Failed to update preventive:', error);
      this.notifyService.showDanger("Une erreur s'est produite lors de la modification de la prévention.", "Erreur");
    }
  );
  
}
else{
  this.notifyService.showDanger("erreur  !!","Vérifier les champs vide")


}


   }


findbyid(){
this.id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.findPreventivebyid(this.id).subscribe((data:Preventive) => {
      this.preventive=data
      this.Updateform = this.fb.group({
        equipement: [this.preventive[0].equipement.id],
        tache: [this.preventive[0].tache],
        interval: [this.preventive[0].interval],
        description: [this.preventive[0].description],
       
        // code_fournisseur: [data.code_fournisseur],
       })

       console.log(this.Updateform);



    })}






   get f() { return this.form.controls; }




 
get sortData() {
  return this.Intervention.sort((a:any, b:any) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime());
}
onTableDataChange(event:any){
  this.page = event;
 
}  

onTableSizeChange(event:any): void {
  this.tableSize = event.target.value;
  this.page = 1;
 
}




}
