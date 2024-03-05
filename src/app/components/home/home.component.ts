import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Etatequipement } from 'src/app/etatequipement.model';
import { Intervention } from 'src/app/intervention.model';
declare var $: any;
import { Ordreintervention } from 'src/app/ordreintervention.model';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
  export class HomeComponent implements OnInit{
  Userrole:string="";
  Intervention:any=Intervention;
  Demandeintervention:any=[];
  totalnbIn:any=0;
  nbDe:any=0;
  NBDeTraiter:any=0;
  DemandeTraiter:any=0;
  nbIn:any=0;
  interventions:any=Intervention;
  calendarOptions: any;
  selectedDate: Date = new Date();
  id_user:any
  orderintervention:any=Ordreintervention
    /******* bar chart config  */
   

barChartData = [
    { data: [],
      label: 'Nombre de pannes',
      backgroundColor: '#dc3545',
      borderColor: '#dc3545',
      hoverBackgroundColor: '#dc3545', // Set the hover color to blue with 80% opacity
      hoverBorderColor: '#dc3545' 
      
     }
  ]; 

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          beginAtZero: true
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };
  
  

  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];



  /******** end config  */

  public pieChartType: ChartType = 'pie';

  pieChartData: number[] = [];
  pieChartColors: Color[] = [
    {
      borderColor: '#fff',
      backgroundColor: ['yellow', 'green', '#ffcb80', '#dc3545', '#303434']
    }
  ];
  pieChartLabels: Label[] = ['En cours', 'Terminer', 'En attente des pièces', 'Arrêté', 'Suspendue par admin'];

  pieChartOptions = {
    responsive: true
  };

 

  pieChartLegend = true;
  pieChartPlugins = [];

  constructor(private headerTitleService: HeaderTitleService,private Serviceapibackend: BackendApiService,private sessionSotragesevice:SessionstorageService) { 

    
    this.Serviceapibackend.getstatInter().subscribe((data: any) => { 
      this.pieChartData = data;
    })
  }

  
  

  ngOnInit(): void {
    this.allintervention()
    this.getEquipementStats()
    this.Stat()
    this.Userrole = this.sessionSotragesevice.get('UserRole');
    this.id_user=this.sessionSotragesevice.get('UserId');
    console.log(this.id_user)
    this.findordrebytechnicien()


    this.headerTitleService.setTitle('Tableau de bord');

   
   
    
  }
 
Stat(){

  this.Serviceapibackend.getCountDemande().subscribe((data: any) => {
this.nbDe=data.totalD;
this.nbIn=data.totalIn;
this.NBDeTraiter=data.totalTraite;
this.DemandeTraiter=data.demTraite
   
  })



  
  
}
findordrebytechnicien() {
  console.log(this.id_user);
  this.Serviceapibackend.findordrebytechnicien(this.id_user).subscribe((data: Ordreintervention) => {
    this.orderintervention = data;
    console.log(data);
    $('#calendar2').fullCalendar({
      locale: 'fr',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      events: this.orderintervention.map((ordre: any) => ({
        title: ordre.nature_de_travaux ,
        start: ordre.debutprevu,
        end: ordre.finprevu,
        color: ordre.etat == 'cloturer' ? 'green' : 'yellow',
      })),
      buttonText: {
        today: 'aujourd\'hui',
        month: 'mois',
        week: 'semaine',
        day: 'jour'
      },
      eventClick: (jsEvent: any, view: any) => {
        if (jsEvent.color === 'green') {
          window.location.href ='/OrdreTraiter';
        } else {
          window.location.href ='/OrdreNonTraiter';
        }
      }
    });
  });
}

  
allintervention() {
  this.Serviceapibackend.AllIntervention().subscribe((data: Intervention) => {
    this.interventions = data;
    console.log(data);

    $('#calendar').fullCalendar({
      locale: 'fr',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      events: this.interventions.map((intervention: any) => ({
        title: intervention.ordreintervention.nature_de_travaux ,
        start: intervention.date_debut,
        end:intervention.etat == 'terminer' ? intervention.date_fin:intervention.ordreintervention.finprevu,
        color: intervention.etat == 'terminer' ? 'green' : 'yellow',
      })),
      buttonText: {
        today: 'aujourd\'hui',
        month: 'mois',
        week: 'semaine',
        day: 'jour'
      },
      eventClick: ( jsEvent:any, view:any) => {
        window.location.href = '/list-intervention';
      }
    });
  });
}






  


getEquipementStats(){
  this.Serviceapibackend.getEquipementStats().subscribe((stats: any) => {
    this.barChartLabels = Object.keys(stats);
    this.barChartData[0].data = Object.values(stats);
  });

  
}

}
