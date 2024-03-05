import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Preventive } from 'src/app/preventive.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  constructor(private sessionSotragesevice:SessionstorageService,
    private headerTitleService: HeaderTitleService,private Serviceapibackend: BackendApiService,private modalService: NgbModal) { }

preventive:any=Preventive;
closeModal:any ;
id:any;
Fournisseur:any=[];
error="";
error1="";
delete:boolean=true;



  ngOnInit(): void {
    this.headerTitleService.setTitle('Liste de maintenance préventive');
    this.loadpreventive()
  }




  loadpreventive(){
    this.Serviceapibackend.findPreventive().subscribe((data:any) => {
      this.preventive = data;
  
      console.log('preventif')
      console.log(this.preventive)
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
   
    })
  }
  deletepreventive(){
    //  console.log(this.Fournisseur.length)
    this.Serviceapibackend.deletepreventive(this.id).subscribe((data:any) => {
    this. loadpreventive()
    this.modalService.dismissAll()
   })}
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
