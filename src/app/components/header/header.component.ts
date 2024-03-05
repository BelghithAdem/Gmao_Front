import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { SuperAdmin } from 'src/app/super-admin.model';
import Swal from 'sweetalert2';
declare var $:any;
declare var Waves:any;



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ordreintervention:any=[];
  idtech={id:''}
  title = '';
  title1='';
  Superadmin:any=[]
  id: any;
  superadmin :any= SuperAdmin;
  userNom:string="";
  path: string[] = [];
  pathTitle: any;
  NBordre:any=0;
  nbordrenontraiter:any
  Userrole:string="";
  constructor(private router:Router,private Serviceapibackend: BackendApiService,
    private authService:BackendApiService,
    private route: ActivatedRoute,private sessionSotragesevice:SessionstorageService,
    private headerTitleService: HeaderTitleService, private activatedRoute:    ActivatedRoute, ) {

     }

  ngOnInit(): void {
    this.Userrole = this.sessionSotragesevice.get('UserRole');

     this.listNotif();
     this.headerTitleService.title.subscribe(updatedTitle => {
       this.title = updatedTitle;

     });
    console.log('isauthenticated');
     this.userNom=this.sessionSotragesevice.get( 'UserNom')+" "+this.sessionSotragesevice.get( 'UserPrenom')
   console.log(this.sessionSotragesevice.get( 'UserPrenom'));
   this.Userrole = this.sessionSotragesevice.get('UserRole');
   this.idtech.id = this.sessionSotragesevice.get('UserId');
  
   console.log(this.idtech)
  
   this.notifordrenontraiter() 
   
    
    
    } 

notifordrenontraiter(){
  this.Serviceapibackend.countListOrdreInterventionNontraite(this.idtech).subscribe(
    res=>{this.nbordrenontraiter=res
    
    this.nbordrenontraiter= this.nbordrenontraiter.count
    
    },
    err=>{err=err})

}


listNotif(){
  this.Serviceapibackend.getlistordreNotif().subscribe((data: any) => {
    this.ordreintervention = data;
    this.NBordre=Number(data.demande)+Number(data.ordre)+Number(data.intervention);
    console.log('service intervention ')
  console.log(data)
})

}
Stat(){

  this.Serviceapibackend.CountOrdreExceptionBienRecu().subscribe((data: any) => {
    console.log('service intervention ')
  console.log(data)
this.NBordre=data.totalOrdre;
    console.log(data)
  })
  
}





  ngAfterViewInit(){
     $(document).ready(function  () {


      $("#side-nav").metisMenu();
      Waves.init(); 

      $('.button-menu-mobile').on('click', function (event:any) {
        event.preventDefault();
        $("body").toggleClass("enlarge-menu");      
        $('.slimscroll').slimscroll({
          height: 'auto',
          position: 'right',
          size: "7px",
          color: '#9ea5ab',
          wheelStep: 5,
          touchScrollStep: 50
      });
    
    });
      
    })


  }
  deconnexion() {
    Swal.fire({
      title: 'Dèconnexion ?',
      text: "Souhaitez-vous vraiment vous déconnecter ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'oui',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();

    this.sessionSotragesevice.clear();  
    this.authService.logout().subscribe((rest:any) => { 
      this.router.navigate(['/login']); 
     
    });
        
      }
    })
   
  }
  


 


}
