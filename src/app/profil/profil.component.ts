import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../services/header-title.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BackendApiService } from '../services/backend-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  Usernom:string="";
  Userprenom:string="";
  Useremail:string="";
  Userfax:string="";
  Usertel:string="";
  Userrole:string="";
  Userspecialite:string="";
  Userid:string='';
  Admin:any=[]
  dtOptions: DataTables.Settings = {};
  closeModal:any ;
id:any;

  constructor(private Serviceapibackend:BackendApiService,private sessionSotragesevice:SessionstorageService, private headerTitleService: HeaderTitleService, private modalService: NgbModal,private router:Router) { }

  ngOnInit(): void {
    console.log('SessionStorage');
    this.Usernom=this.sessionSotragesevice.get( 'UserNom');
    this.Userprenom=this.sessionSotragesevice.get( 'UserPrenom');
    this.Useremail=this.sessionSotragesevice.get( 'UserEmail');
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    this.Userfax=this.sessionSotragesevice.get( 'Userfax');
    this.Userrole=this.sessionSotragesevice.get( 'UserRole');
    this.Userid=this.sessionSotragesevice.get( 'UserId');
    console.log(this.sessionSotragesevice.get( 'UserRole'));
    this.Userspecialite=this.sessionSotragesevice.get( 'Userspecialite');

    
    console.log(this.Userprenom)
    this.headerTitleService.setTitle('Profil');console.log('profil')
   



    

  }
  deleteadmin(){
    this.Serviceapibackend.deleteAdmin(this.Userid).subscribe(data => {
      this.router.navigate(['/login']);
      
    })

}
  triggerModal(content:any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
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
