import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  @Input() UserDetails = { nom: '',prenom:'', email: '', password: '',adresse:'',tel:''  }

  form:any= FormGroup;
  passwordVisible: boolean = false;
  passwordVisible1: boolean = false;
  submitted = false;
  constructor(private fb: FormBuilder,
    private notifyService : NotificationService,
    private Serviceapibackend: BackendApiService,
    private router: Router,private formBuilder: FormBuilder) { 
     
    }
    
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
    togglecPasswordVisibility() {
      this.passwordVisible1 = !this.passwordVisible1;
    }
  ngOnInit(): void {


    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      password: [null, [Validators.required,Validators.minLength(8)]],
      confirmPassword: [null,[Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
  },
  { validator: this.passwordMatchValidator }
  );
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
  
      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  isConfirmPasswordInvalid() {
    const confirmPasswordControl = this.form.get('confirmPassword');
    return confirmPasswordControl.touched && confirmPasswordControl.errors && confirmPasswordControl.errors.passwordMismatch;
  }
// convenience getter for easy access to form fields
get f() { return this.form.controls; }

submit() {
  console.log(this.form.value);
  if (this.form.valid){
    this.Serviceapibackend.createAdmin(this.form.value).subscribe(
      res => {
        console.log('Admin created successfully!');
        this.router.navigate(['/admin']);
        this.notifyService.showSuccess("Administrateur créé avec succès!", "Succès");
      },
      error => {
        console.error('Failed to create Admin:', error);
        this.notifyService.showDanger("Une erreur s'est produite lors de la création de l'administrateur.", "Erreur");
      }
    );
    
    }
    else{
      this.notifyService.showDanger("erreur  !!","verifier les champs vide")


    }
}

}
