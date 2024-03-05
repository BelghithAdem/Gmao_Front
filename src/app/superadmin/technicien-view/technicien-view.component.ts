import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { Technicien } from 'src/app/technicien.model';

@Component({
  selector: 'app-technicien-view',
  templateUrl: './technicien-view.component.html',
  styleUrls: ['./technicien-view.component.css']
})
export class TechnicienViewComponent implements OnInit {
  Ligne:any=[]
  id: any;
  technicien:any= Technicien;
   
  constructor(
    private Serviceapibackend: BackendApiService, 
    private router: Router, 
    private route: ActivatedRoute,
   ) {  
    
    }
  
  ngOnInit(): void {
    this.readLigne();
    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getTechnicien(id).subscribe((data: Technicien) => {
      console.log(data);
      this.technicien = data;  })  
  }

readLigne() {

  this.Serviceapibackend.AllLigne().subscribe((data: {}) => {
    this.Ligne = data;
    console.log('ligne')
    console.log(this.Ligne)
  })
}
}
