import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() superadmin = {  email: '', password: '' }
  objemail={email:''};
  error=0;
  loginForm:any= FormGroup;
  submitted = false;
  loading = false;
  obj:any
  MessageCount:any
  count:any
 
  constructor(
    private fb: FormBuilder,private authService:BackendApiService,
    private router:Router,private sessionSotragesevice:SessionstorageService
  ) { 

 }
  form = {
    password:'',
    email:'',
  };
    

  ngOnInit() {


    // window.location.reload();
    // sessionStorage.clear();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.minLength(8)]],
    },);
  
    if (this.loginForm.invalid) {
      return;
    }
  
  }
    // convenience getter for easy access to form fields

  get loginFormControl() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
       // stop here if form is invalid
    if (this.loginForm.valid) {  
      console.log(this.loginForm.value);
      console.log("connexion est valid ")
      this.superadmin=  this.loginForm.value;
      console.log(this.superadmin.email,this.superadmin.password);
      this.loading = true;
       this.authService.login(this.superadmin).subscribe((result:any) => {  
        console.log('result service ');
        console.log(result);
        this.authService.countmessage().subscribe((data: any)=>{
          this.MessageCount=data.count;
          this.sessionSotragesevice.set( 'count',this.MessageCount);
          console.log(this.sessionSotragesevice.get('count'))
      
        })
        if(result.status ==true ) {   
       this.sessionSotragesevice.set( 'UserRole',result.role);
       this.sessionSotragesevice.set( 'UserNom',result.user[0].nom);
       this.sessionSotragesevice.set( 'UserPrenom',result.user[0].prenom);
       this.sessionSotragesevice.set( 'UserEmail',result.user[0].email);
       this.sessionSotragesevice.set( 'UserTel',result.user[0].tel);
       this.sessionSotragesevice.set( 'Userfax',result.user[0].fax);
       this.sessionSotragesevice.set( 'UserPassword',result.user[0].password);
       this.sessionSotragesevice.set( 'UserAdresse',result.user[0].adresse);
       this.sessionSotragesevice.set( 'UserId',result.user[0].id);
       this.sessionSotragesevice.set( 'Userspecialite',result.user[0].specialite);
       this.sessionSotragesevice.set( 'token',result.token);
       console.log(result.user[0])
       console.log( this.sessionSotragesevice.get( 'UserRole'));

      if (result.role === 'admin') {
        this.router.navigate(['/home']);
      } else if (result.role === 'employee') {
        this.router.navigate(['/homeemploye']);
      }
       else if (result.role === 'technicien'){
        this.router.navigate(['/home']);
      }
           
    } 
    else {
      this.error=1;
    }
         
      }); 
    }
      }
      envoyer(){
        console.log(this.objemail)
        this.authService.getPasswordByEmail(this.objemail).subscribe((result:any) => { 

         console.log( result.res)
         if(result.res=='true'){
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 4000
          })
        }
        else if(result.res=='false'){
           
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:result.message,
            footer: '<p>Essaie une autre fois</p>'
          })
        }
      });
    
      }



    }