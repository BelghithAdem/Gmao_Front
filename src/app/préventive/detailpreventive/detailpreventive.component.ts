import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipement } from 'src/app/equipement.model';
import { Preventive } from 'src/app/preventive.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
@Component({
  selector: 'app-detailpreventive',
  templateUrl: './detailpreventive.component.html',
  styleUrls: ['./detailpreventive.component.css']
})
export class DetailpreventiveComponent implements OnInit {
  id: any;
  preventive :any= Preventive
  constructor(private Serviceapibackend: BackendApiService,  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.findPreventivebyid(this.id).subscribe((data:Preventive) => {
      console.log(data);
      this.preventive =data;
     })
  }
}
