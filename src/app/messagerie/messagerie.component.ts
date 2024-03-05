import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { BackendApiService } from '../services/backend-api.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {

  constructor( private elementRef: ElementRef,private notifyService : NotificationService,private headerTitleService: HeaderTitleService ,public servicemessage:BackendApiService,public sessionSotragesevice:SessionstorageService,private router: Router) { this.loadmessage(); }
message:any 
msj:any
user:any
role:any
image:any
nom:any
submitted = false;
id_user:any
notif:any
@ViewChild('chatWindow', { static: false }) chatWindow!: ElementRef;


  ngOnInit(): void {
    this.id_user=this.sessionSotragesevice.get('UserId');
    this.role=this.sessionSotragesevice.get('UserRole');
    this.user=this.sessionSotragesevice.get( 'UserNom')+" "+this.sessionSotragesevice.get( 'UserPrenom');
    this.nom=this.sessionSotragesevice.get( 'UserNom')+" "+this.sessionSotragesevice.get( 'UserPrenom');
    this.headerTitleService.setTitle(' Messagerie');console.log('Messagerie')
    this.servicemessage.countmessage().subscribe((data: any)=>{
    this.sessionSotragesevice.set( 'count',(data.count));
     });

  }
  loadmessage(){
    return this.servicemessage.getmessage().subscribe((data: any)=>{
      this.message=data.messages;

console.log(this.id_user)
      
    }); 
}
selectimg(e:any){
  this.image=e.target.files[0]
    }

    send() {
      console.log(this.image);
      let data = new FormData();
      data.append('user',this.user);
      data.append('text',this.msj);
      data.append('role',this.role);
      data.append('id_user',this.id_user);

      if(this.image){
        data.append('image',this.image);
        console.log(data);
      }
    
      if(data){
        this.servicemessage.sendmessage(data).subscribe(
          res => {
            console.log('Message created successfully!');
            this.msj = "";
            this.notifyService.showSuccess("Message créé avec succès!", "Succès");
            this.loadmessage(); // Recharge les messages
            this.router.navigate(['/Messagerie']);
          },
          error => {
            console.error('Failed to create message:', error);
            this.notifyService.showDanger("Une erreur s'est produite lors de la création du message.", "Erreur");
          }
        );
        
      } else {
        this.notifyService.showDanger("message !!","error");
      }
    }
    delete(id:any){
      Swal.fire({
        title: 'Es-tu sûr?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.servicemessage.deletemessage(id).subscribe(
            res => {
              this.notifyService.showSuccess("Message supprimé avec succès!","Succès");
              this.loadmessage(); // rechargement des messages
            },
            error => {
              this.notifyService.showDanger("Erreur lors de la suppression du message!","Erreur");
            }
          )
        }
      });
    }
    

    ngAfterViewChecked() {
      this.scrollToBottom();
    }
  
    scrollToBottom(): void {
      try {
        this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
      } catch(err) { }
    }
    


}
