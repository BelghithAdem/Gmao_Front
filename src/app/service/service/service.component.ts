import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  Ligne:any=[]
  dtOptions: DataTables.Settings = {};
  closeModal:any ;
  id:any;
  error=""; 
  delete:boolean=true;
  constructor( 
    private Serviceapibackend: BackendApiService, private headerTitleService: HeaderTitleService,
    // private Adminservice: AdminService,
    private modalService: NgbModal) {
    this.loadLigne();
   }

  ngOnInit(): void {
 
   
    this.headerTitleService.setTitle('Ligne');console.log('Ligne')


  }
  loadLigne(){//get list users
  
    return this.Serviceapibackend.AllLigne().subscribe((data: any)=>{
      this.Ligne=data;
      console.log(this.Ligne);
      setTimeout(()=>{                          
        $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          retrieve: true,
          lengthMenu : [5, 10, 25],
          order:[[1,"desc"]],
          language: {
            "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json"
          }
          
      } );
      }, 1);
  
  
    }); 
}
deleteLigne(){

this.Serviceapibackend.deleteLigne(this.id).subscribe((data:any) => {
this.loadLigne();
this.modalService.dismissAll()
  })

}
  
triggerModal(content:any,id:any) {
  this.id=id;
  this.error="";
  this.delete=true;


    this.Serviceapibackend.deleteLigneWithequipementNoPermitted(this.id).subscribe((data:any) => {
      if(data.action =="oui"){
      this.error ="Voulez-vous vraiment supprimer ces enregistrements ?"
      this.delete=false;
    }
  else{
    this.delete=true;
      this.error ="Vous n'avez pas le droit de supprimer cette enregistrements"
  }
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
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
