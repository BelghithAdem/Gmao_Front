import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/employee.model';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  message="";
  id: any;
  employee:any= Employee;
  updateEmployeeForm:any= FormGroup;
  passwordVisible = false;

  constructor(     private Serviceapibackend: BackendApiService,
    private notifyService : NotificationService, 
                private router: Router, 
                public fb: FormBuilder,
                private actRoute: ActivatedRoute) 
                {

                  
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.Serviceapibackend.getEmployee(id).subscribe((data) => {
      console.log(data);
    this.updateEmployeeForm = this.fb.group({
        nom: [data.nom, Validators.required],
        prenom: [data.prenom, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
     
        adresse: [data.adresse, Validators.required],
        tel: [data.tel, Validators.required],
        password: [data.password, Validators.required] })
   }) }
   togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  ngOnInit(): void {
    this.updateForm()
  }
  updateForm(){
    
    this.updateEmployeeForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: [''],
      adresse: [''],
      tel: [''],


    })    
  }
  submitForm(){
    if (this.updateEmployeeForm.valid){

    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.updateEmployeeForm.value);
    this.Serviceapibackend.updateEmployee(id, this.updateEmployeeForm.value).subscribe(
      data => {
        this.employee = data;
        console.log(data);
        console.log(this.updateEmployeeForm.value);
        this.message = "Employee was updated";
        this.router.navigate(['/employee-list']);
        console.log(data);
        this.notifyService.showSuccess("Employé mis à jour avec succès!", "Succès");
      },
      error => {
        console.error('Failed to update Employee:', error);
        this.notifyService.showDanger("Une erreur s'est produite lors de la mise à jour de l'employé.", "Erreur");
      }
    );
    
    }
    else{
      this.notifyService.showDanger("erreur  !!","verifier les champs vide")


    }
}
}
