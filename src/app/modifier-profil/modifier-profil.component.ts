import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { BackendApiService } from '../services/backend-api.service';
import { SessionstorageService } from '../services/sessionstorage.service';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css']
})
export class ModifierProfilComponent implements OnInit {
  message="";
  id: any;
  user:any;
  updateProfilForm:any= FormGroup;
  Userspecialite:string="";
  Userpassword:string=""
  Usernom:string="";
  Userprenom:string="";
  Useremail:string="";
  Usertel:string="";
  Userid:string="";
  Userrole:string="";
  userrol:any;
  nom:string="";
  confirmPassword:string='';
  password:any;
  tel:any;
  email:any
passwordVisible: boolean = false;
passwordVisible1: boolean = false;

  constructor(private apiService:BackendApiService,
    private Serviceapibackend: BackendApiService,
    private router: Router,  private notifyService : NotificationService,
    public fb: FormBuilder,private sessionSotragesevice:SessionstorageService,
    private actRoute: ActivatedRoute) { 
                      
  var Userid = this.actRoute.snapshot.paramMap.get('UserId');
   


 }
 togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}
togglecPasswordVisibility() {
  this.passwordVisible1 = !this.passwordVisible1;
}


  ngOnInit(): void {
     
      this.Usernom=this.sessionSotragesevice.get('UserNom');
      this.Userprenom=this.sessionSotragesevice.get('UserPrenom');
      this.Useremail=this.sessionSotragesevice.get('UserEmail');
      this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
      this.Userpassword=this.sessionSotragesevice.get( 'UserPassword');
      this.Userid=this.sessionSotragesevice.get( 'UserId');
      this.Userspecialite=this.sessionSotragesevice.get( 'Userspecialite');
      this.Userrole= this.sessionSotragesevice.get( 'UserRole')
      //
      console.log(this.sessionSotragesevice.get( 'UserNom'));
      console.log(this.sessionSotragesevice.get( 'UserPrenom'));
      console.log(this.sessionSotragesevice.get( 'UserEmail'));
      console.log(this.sessionSotragesevice.get( 'UserPassword'));
      console.log(this.sessionSotragesevice.get( 'UserRole'));
      console.log(this.sessionSotragesevice.get( 'UserId')); 


      this.updateProfilForm = this.fb.group({
        nom: [this.Usernom , Validators.required],
       prenom: [this.Userprenom , Validators.required],
       email: [this.Useremail , Validators.required],
         tel: [this.Usertel , Validators.required],
         specialite: [this.Userspecialite],
         password: [this.Userpassword , Validators.required],
         confirmPassword: [this.Userpassword, Validators.required]
   },
   { validator: this.passwordMatchValidator } )
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
    const confirmPasswordControl = this.updateProfilForm.get('confirmPassword');
    return confirmPasswordControl.touched && confirmPasswordControl.errors && confirmPasswordControl.errors.passwordMismatch;
  }

  
  
submitForm(){
  if (this.updateProfilForm.valid){
  console.log(this.updateProfilForm.value)
  var values = this.updateProfilForm.value;
  console.log('updateprofil')
    this.updateProfilForm.value.Userid=this.Userid;
    console.log(this.updateProfilForm.value.Userid)
   //updated selon le role 
    this.updateProfilForm.value.Userid=this.sessionSotragesevice.get( 'UserRole');
    this.apiService.updateUserConnected(this.sessionSotragesevice.get('UserRole'), this.updateProfilForm.value).subscribe(
      data => {
        this.sessionSotragesevice.set('UserNom', values.nom);
        this.sessionSotragesevice.set('UserPrenom', values.prenom);
        this.sessionSotragesevice.set('UserEmail', values.email);
        this.sessionSotragesevice.set('UserTel', values.tel);
        this.sessionSotragesevice.set('Userfax', values.fax);
        this.sessionSotragesevice.set('UserPassword', values.password);
        this.sessionSotragesevice.set('Userspecialite', values.specialite);
    
        this.userrol = data;
        this.updateProfilForm.patchValue(data);
    
        console.log(data);
    
        this.router.navigate(['/profil']);
        this.notifyService.showSuccess("Profil modifié avec succès!", "Succès");
      },
      error => {
        console.error('Failed to update user profile:', error);
        this.notifyService.showDanger("Une erreur s'est produite lors de la modification du profil.", "Erreur");
      }
    );
    
  }
  else{
    console.log(this.updateProfilForm.valid);
   
    this.notifyService.showDanger("erreur  ","verifier les champs vide ou incorrect")
  }
}


}
