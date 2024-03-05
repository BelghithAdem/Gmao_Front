import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
        import { interval } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  superadmin:any;
  admin:any;
  Userrole:string="";
  title='';
  MessageCount:any
  count:any
  notif:any
  constructor(  private headerTitleService: HeaderTitleService
    ,private sessionSotragesevice:SessionstorageService,private apiService:BackendApiService,private router:Router ) { }

  ngOnInit(): void {

    // Interroger l'API toutes les 10 secondes pour obtenir le nombre de messages non lus
    interval(10000).subscribe(() => {
      this.apiService.countmessage().subscribe((data: any)=>{
        this.count = this.sessionSotragesevice.get('count');
        this.MessageCount = data.count;
        if (this.router.url !== '/Messagerie') {
          this.notif = this.MessageCount - this.count;
        } else {
          this.notif = 0;
          this.sessionSotragesevice.set( 'count',(this.MessageCount));

        }
      });
    });

    // Détecter si la page est rechargée et réinitialiser la notification
    

    // Obtenir le rôle de l'utilisateur
    this.Userrole = this.sessionSotragesevice.get('UserRole');
  }

}
