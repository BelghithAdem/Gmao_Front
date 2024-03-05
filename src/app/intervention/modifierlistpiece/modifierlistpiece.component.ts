import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Demandepiece } from 'src/app/demandepiece.model';
import { Intervention } from 'src/app/intervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';




@Component({
  selector: 'app-modifierlistpiece',
  templateUrl: './modifierlistpiece.component.html',
  styleUrls: ['./modifierlistpiece.component.css']
})
export class ModifierlistpieceComponent implements OnInit {
 
  form2:any= FormGroup;
  id:any;
  id2:any;
  intervention:any;
  Userrole:string="";
  idTechnicien:string="";
  PiecesRechange:any=[]
  dropdownList:any = [{item_id: "",item_text: ""}];
  Usertel:string="";
  Useradresse:string="";
  
  constructor(private actRoute: ActivatedRoute,private notifyService : NotificationService,private route: ActivatedRoute,
    private router: Router,private formBuilder: FormBuilder,
    private sessionSotragesevice:SessionstorageService,private Serviceapibackend: BackendApiService) {
      this.form2 = this.formBuilder.group({
        liste: this.formBuilder.array([])
      });
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.Usertel = this.sessionSotragesevice.get('UserTel');
    this.idTechnicien = this.sessionSotragesevice.get('UserId');
   this.id2= this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.AlPiecesRechange().subscribe((data: any) => {
      this.PiecesRechange = data;
      let list = []
      for (let x = 0; x < data.length; x++) {
        const element = data[x];
        list.push({item_id:element.id,item_text:element.nom_piece+" | "+element.ref_piece})
      }
      this.dropdownList = list;
      console.log('gf kais',this.dropdownList);
    });
  
    this.Serviceapibackend.getintervention(id).subscribe((data: any) => {
      console.log(data);
      this.intervention = data;
      this.form2 = this.formBuilder.group({
        liste: this.formBuilder.array([])
      });
      this.Initlistepiece(data.demandepieces);
    });
  }
  
  /****** Array list liste piece *******/
  Initlistepiece(listpiece:any) {
    console.log("rrrrrrrrrrrrrrrrrrr");
    console.log(listpiece);
    var x = this.form2.get('liste') as FormArray ;
    for (let i = 0; i < listpiece.length; i++) {
      const el = listpiece[i];
      x.push(this.formBuilder.group({
        quantite: [el.quantite, Validators.required],
        piece: [el.piece, Validators.required]
      }));
    }
  }
  
  liste():FormArray {
    return this.form2.get("liste") as FormArray;
  }
  
  addQuantite(e:any) {
    e.preventDefault();
    var x = this.form2.get('liste') as FormArray ;
    x.push(this.formBuilder.group({
      piece: ["", Validators.required],
      quantite: ["", Validators.required]
    }));
  }
  
  removeQuantite(index:any) {
    (this.form2.get('liste') as FormArray).removeAt(index);
  }
  
  submit() {
    if (this.form2.valid) {
      console.log(this.form2.value);
      this.form2.value.intervention = this.route.snapshot.paramMap.get('id');
      this.Serviceapibackend.updateDemandepiece(this.form2.value).subscribe(res => {
        console.log('demande de pieces updated successfully!');
        console.log(this.form2.value);
        this.router.navigate(['/update-intervention/'+this.id2]);
        this.notifyService.showSuccess("demande de pieces !!", "Bien Modifiée");
      });
    } else {
      this.notifyService.showDanger("demande de pieces !!", "Vérifier les champs vides");
    }
  }
}  