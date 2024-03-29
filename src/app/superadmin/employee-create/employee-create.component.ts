import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  @Input() UserDetails = { nom: '',prenom:'', email: '',adresse:'',tel:'' }

  form:any= FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private notifyService : NotificationService,    private Serviceapibackend: BackendApiService,
    private router: Router,private formBuilder: FormBuilder) { 
     
    }
    

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
  },
  );
  }
// convenience getter for easy access to form fields
get f() { return this.form.controls; }

submit() {
  console.log(this.form.value);
  if (this.form.valid){
    this.Serviceapibackend.createEmployee(this.form.value).subscribe(
      res => {
        console.log(res);
        console.log('Employee created successfully!');
        this.router.navigate(['/employee-list']);
        this.notifyService.showSuccess("Employé créé avec succès!", "Succès");
      },
      error => {
        console.error('Failed to create Employee:', error);
        this.notifyService.showDanger("Une erreur s'est produite lors de la création de l'employé.", "Erreur");
      }
    );
    
    }
    else{
      this.notifyService.showDanger("erreur  !!","verifier les champs vide")


    }
}
}
