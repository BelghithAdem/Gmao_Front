import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderTitleService } from 'src/app/services/header-title.service';

@Component({
  selector: 'app-demande-traiter',
  templateUrl: './demande-traiter.component.html',
  styleUrls: ['./demande-traiter.component.css']
})
export class DemandeTraiterComponent implements OnInit {
  Demandeintervention:any=[];
  Employee: any = [];
  Ordreintervention: any = [];
  Min:any;
  Max:any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [3, 6, 9, 12];
  constructor(private http: HttpClient,private Serviceapibackend: BackendApiService, private headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('  DEMANDE TRAITE ');

    this.loadDemandeintervention();
    // this.readOrdre();
    // this.readEmployee();
  }
  loadDemandeintervention(){
    this.Serviceapibackend.getListDemandeInterventionAffected().subscribe((data:any) => {
      this.Demandeintervention = data
      this.Demandeintervention = data.demandeintervention;
      console.log('service intervention affected')
      console.log(this.Demandeintervention)
     
    })
  }
 getFormatedDate(date: Date, format: string) {
  const datePipe = new DatePipe('en-Tn');
  return datePipe.transform(date, format);
} 

onTableDataChange(event:any){
  this.page = event;
}  

onTableSizeChange(event:any): void {
  this.tableSize = event.target.value;
  this.page = 1;
}  
get sortData() {
  return this.Demandeintervention.sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime());

 
 }




}
