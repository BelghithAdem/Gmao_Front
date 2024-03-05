import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {

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

  constructor(private sessionSotragesevice:SessionstorageService, private headerTitleService: HeaderTitleService, private modalService: NgbModal,private router:Router) { }

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
    this.headerTitleService.setTitle('Acceuil');console.log('home')
   



    

  }
  

  
}