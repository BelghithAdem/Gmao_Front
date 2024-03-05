import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../admin.model';
import { Demandeintervention } from '../demandeintervention.model';
import { Demandepiece } from '../demandepiece.model';
import { Employee } from '../employee.model';
import { Equipement } from '../equipement.model';
import { Etatequipement } from '../etatequipement.model';
import { Fournisseur } from '../fournisseur.model';
import { Intervention } from '../intervention.model';
import { Ordreintervention } from '../ordreintervention.model';
import { PiecesRechange } from '../pieces-rechange.model';
import { Ligne } from '../ligne.model';
import { Tache } from '../tache.model';
import { Technicien } from '../technicien.model';
import { io } from 'socket.io-client';
import { Email } from '../email.model';
import { Message } from '../message.model';
import { Pieceintervention } from '../pieceintervention.model';
import { Preventive } from '../preventive.model';
@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  private socket: any;
  apiUrl='http://localhost:1337/'

  roleAs:string="";
  constructor(private http: HttpClient,private router: Router) {
    // this.socket = io(this.apiUrl);
   }

  currentUserSubject:any;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  } 
  
 
getstatOrdre() {
  return this.http.get(this.apiUrl + 'ordreintervention/getlistStat', this.httpOptions)

}
login(obj:any) {
  console.log("service"+obj)
  return this.http.post(this.apiUrl+'authenticator/authentifier',obj);
}
logout(){
  return this.http.get(this.apiUrl+'authenticator/logout');    
}
updateUserConnected(role:string,obj:any){
  var object={role:role , data:obj};
  return this.http.post(this.apiUrl+'authenticator/updateSelonRole',object);

}
getPasswordByEmail(email:any):Observable<Email> {
  return this.http.post<Email>(this.apiUrl+'getPasswordByEmail',email)
}

//*********************Demande  interventions******************



 // HttpClient API get() method => Fetch Demandeintervention list
 getDemandeinterventions(): Observable<Demandeintervention> {
  console.log(length)

  return this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention')

 
}
getinterventions(): Observable<Demandeintervention> {
  console.log(length)

  return this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention/getAllDemande')

 
}
getDemandeinterventionsByEmployee(id:any): Observable<Demandeintervention> {
  console.log(length)

  return this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention/getDemandeSelonEmployeeConnected/?id='+ id , this.httpOptions)
}

getDemandeNontraiteSelonEmployeeConnected(id:any): Observable<Demandeintervention> {
  console.log(length)

  return this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention/getDemandeNontraiteSelonEmployeeConnected/?id='+ id , this.httpOptions)
}

// HttpClient API get() method => Fetch Demande
getDemandeintervention(id:any): Observable<Demandeintervention> {
  return this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention/getDemandeById/?id=' + id , this.httpOptions)
 
}  
// HttpClient API get() method => Fetch ListDemandeInterventionNonAffected
getListDemandeInterventionNonAffected(): Observable<Demandeintervention> {
  return this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention/getListDemandeInterventionNonTraiter')
 
} 

// HttpClient API get() method => Fetch ListDemandeInterventionNonAffected
getListDemandeInterventionAffected(): Observable<Demandeintervention> {
  return this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention/getListDemandeInterventionTraiter')
 
}

// HttpClient API post() method => Create Demande
createDemandeintervention(demandeintervention:any): Observable<Demandeintervention> {
  console.log(demandeintervention);

  return this.http.post<Demandeintervention>(this.apiUrl + 'demandeintervention/createDemande', JSON.stringify(demandeintervention), this.httpOptions)
}  

// HttpClient API put() method => Update Demande

updateDemande(id:any, demandeintervention:any): Observable<Demandeintervention> {
  demandeintervention.id=id;
  console.log(demandeintervention)
  return this.http.post<Demandeintervention>(this.apiUrl + 'demandeintervention/updateDemande?id' + id, demandeintervention, this.httpOptions)
  
}

// HttpClient API delete() method => Delete Demande 
deleteDemande(id:any){
  return this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention/deleteDemande?id=' + id, this.httpOptions)
 
}
ShowDemandebyId(id:any): Observable<Demandeintervention> {
  return this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention/getDemandeById?id=' + id, this.httpOptions)

  
}
createPreventive(preventive:any):Observable<Preventive> {

  return this.http.post<Preventive>(this.apiUrl + 'preventive/create',JSON.stringify(preventive),this.httpOptions)

}
findPreventive():Observable<Preventive> {

  return this.http.get<Preventive>(this.apiUrl + 'preventive/findall')

}
findPreventivebyid(id:any):Observable<Preventive> {

  return this.http.get<Preventive>(this.apiUrl + 'preventive/find?id=' +id,this.httpOptions)

}
deletepreventive(id:any):Observable<Preventive> {

  return this.http.get<Preventive>(this.apiUrl + 'preventive/destroy?id=' + id,this.httpOptions)

}

updatepreventive(id:any,preventive:any):Observable<Preventive> {

  return this.http.post<Preventive>(this.apiUrl + 'preventive/update?id=' + id,preventive,this.httpOptions)

}

//*********************Ordre  interventions******************

 // HttpClient API get() method => Fetch Ordreintervention list
 getOrdre(): Observable<Ordreintervention> {
  console.log(length)
//alert(length)
  return this.http.get<Ordreintervention>(this.apiUrl +'ordreintervention')

  
}
AllOrdre(): Observable<Ordreintervention> {
  console.log(length)
//alert(length)
  return this.http.get<Ordreintervention>(this.apiUrl +'ordreintervention/getAllordreIntervention')

  
}
getInterventionByTechnicienFromDay(id:any): Observable<Ordreintervention> {
  return this.http.get<Ordreintervention>(this.apiUrl + 'ordreintervention/getInterventionByTechnicienFromDay/?id=' + id , this.httpOptions)
}

// HttpClient API get() method => Fetch Ordreintervention
getOrdreintervention(id:any): Observable<Ordreintervention> {
  return this.http.get<Ordreintervention>(this.apiUrl + 'ordreintervention/getOrdreinterventionById?id=' + id , this.httpOptions)
 
}  
findordrebytechnicien(id:any): Observable<Ordreintervention> {
  return this.http.get<Ordreintervention>(this.apiUrl + 'ordreintervention/findordrebytechnicien?id=' + id , this.httpOptions)
 
}  




// HttpClient API post() method => Create Ordre intervention
createOrdreintervention(ordreintervention:any): Observable<Ordreintervention> {
  console.log(ordreintervention);

  return this.http.post<Ordreintervention>(this.apiUrl + 'ordreintervention/createOrdreintervention', JSON.stringify(ordreintervention), this.httpOptions)
}  

// HttpClient API put() method => Update ordre intervention

updateOrdre(id:any, ordreintervention:any): Observable<Ordreintervention> {
  ordreintervention.id=id;
  console.log(ordreintervention)
  return this.http.post<Ordreintervention>(this.apiUrl + 'ordreintervention/updateordreintervention?id' + id, ordreintervention, this.httpOptions)
  
}


// HttpClient API delete() method => Delete Ordre 
deleteordreintervention(id:any){
  return this.http.get<Ordreintervention>(this.apiUrl + 'ordreintervention/deleteordreintervention?id=' + id, this.httpOptions)
 
}

//*********************les interventions******************

 // HttpClient API get() method => Fetch  intervention list
 getIntervention(): Observable<Intervention> {
  console.log(length)
//alert(length)
  return this.http.get<Intervention>(this.apiUrl +'intervention')

  
}
GETintervention(): Observable<Intervention> {
  console.log(length)
//alert(length)
  return this.http.get<Intervention>(this.apiUrl +'intervention' )

  
}
AllIntervention(): Observable<Intervention> {
  console.log(length)
  return this.http.get<Intervention>(this.apiUrl +'intervention')

  
}
getAllHistoryIntervention(): Observable<Intervention>{
  return this.http.get<Intervention>(this.apiUrl +'intervention/getAllHistoryIntervention')
}
getAInterventionWithDetails(): Observable<Intervention>{
  return this.http.get<Intervention>(this.apiUrl +'intervention/getAllInterventionWithDetails')
}
getlistdemandebyintervention(id:any): Observable<Demandepiece>{
  return this.http.get<Demandepiece>(this.apiUrl +'demandepiece/getlistdemandebyintervention?id='+id , this.httpOptions)
}
getAllInterventionWithDetails(id:any): Observable<Intervention> {
  return this.http.get<Intervention>(this.apiUrl + 'intervention/getAllInterventionByTechWithDetails?idTech='+ id , this.httpOptions)
}  
// HttpClient API get() method => Fetch intervention
getintervention(id:any): Observable<Intervention> {
  return this.http.get<Intervention>(this.apiUrl + 'intervention/getInterventionWithDetails/?id=' + id , this.httpOptions)
 
}
printdemandepiece(id:any):Observable<Blob>{
  return this.http.get(this.apiUrl + 'demandepiece/printDemandePiece/?id=' + id ,{...this.httpOptions, responseType: 'blob'})
}


// HttpClient API post() method => Create intervention
createIntervention(intervention:any): Observable<Intervention> {
  console.log(intervention);

  return this.http.post<Intervention>(this.apiUrl + 'intervention/createIntervention', JSON.stringify(intervention), this.httpOptions)
}  

// HttpClient API get() method => Fetch intervention
GetIntervention(id:any): Observable<Intervention> {
  return this.http.get<Intervention>(this.apiUrl + 'intervention/getInterventionWithDetails?id=' + id , this.httpOptions)
 
}  


// HttpClient API put() method => Update intervention

updateIntervention(id:any, intervention:any): Observable<Intervention> {
  intervention.id=id;
  // console.log(intervention)
  return this.http.post<Intervention>(this.apiUrl + 'intervention/updateIntervention?id=' + id, intervention, this.httpOptions)
  
}

// HttpClient API delete() method => Delete Intervention 
deleteIntervention(id:any){
  return this.http.get<Intervention>(this.apiUrl + 'intervention/deleteIntervention?id=' + id, this.httpOptions)
 
}
// HttpClient API  get list stat
getstatInter(){
  return this.http.get<Intervention>(this.apiUrl + 'intervention/getlistStat', this.httpOptions)
 
}




// HttpClient API CountDemande 
getCountDemande():Observable<Demandeintervention>{
  return  this.http.get<Demandeintervention>(this.apiUrl + 'demandeintervention/CountDemande', this.httpOptions)
}
//API count odre bien recu et rejetee
CountOrdreExceptionBienRecu():Observable<Ordreintervention>{
  return  this.http.get<Ordreintervention>(this.apiUrl + 'ordreintervention/CountOrdreExceptionBienRecu', this.httpOptions)
}

getlistordreNotif():Observable<Ordreintervention>{
  return  this.http.get<Ordreintervention>(this.apiUrl + 'ordreintervention/getlistordreNotif', this.httpOptions)
}
// HttpClient API CountDemande 
getCountOrdre(id:string):Observable<Intervention>{
  return  this.http.get<Intervention>(this.apiUrl + 'intervention/CountOrdreIntervention?id='+id, this.httpOptions)
}
countListOrdreInterventionNontraite(id:any){
  return  this.http.post(this.apiUrl + 'ordreintervention/countListOrdreInterventionNontraite',id)


}

/******************* Api Equipement ******************/
AllEquipement(): Observable<Equipement> {
  //console.log(length)
//alert(length)
  return this.http.get<Equipement>(this.apiUrl +'equipement')

  
}

// HttpClient API get() method => Fetch equipement
getEquipementById(id:any): Observable<Equipement> {
  return this.http.get<Equipement>(this.apiUrl + 'equipement/' + id , this.httpOptions)
 
}  

getEquipementByLigne(id:any): Observable<Equipement> {
  return this.http.get<Equipement>(this.apiUrl + 'equipement/getAllEquipementByLigne?id=' + id , this.httpOptions)
 
}  


// HttpClient API post() method => Create intervention
createEquiement(equipement:any): Observable<Equipement> {
  console.log('equipement');
  console.log(equipement);

  return this.http.post<Equipement>(this.apiUrl + 'equipement/add', JSON.stringify(equipement), this.httpOptions)
}  

// HttpClient API put() method => Update equipement

updateEquipement(id:any, equipement:any): Observable<Equipement> {
  equipement.id=id;
  //console.log(equipement)
  return this.http.post<Equipement>(this.apiUrl + 'equipement/updateEquipement?id' + id, equipement, this.httpOptions)
  
}

// HttpClient API delete() method => Delete Intervention 
deleteEquipement(id:any){
  return this.http.get<Equipement>(this.apiUrl + 'equipement/deleteEquipement?id=' + id, this.httpOptions)
 
}
deleteEquipementWithCondition(id:any){
  return this.http.get<Equipement>(this.apiUrl + 'equipement/deleteEquipementWithdemandeInterventionNoPermitted?id=' + id, this.httpOptions)
 
}



/******************* Api PiecesRechange ******************/



AlPiecesRechange(): Observable<PiecesRechange> {
  //console.log(length)
//alert(length)
  return this.http.get<PiecesRechange>(this.apiUrl +'piecerechange')

  
}

// HttpClient API get() method => Fetch deletePiecerechange
getPiecesRechangeById(id:any): Observable<PiecesRechange> {
  return this.http.get<PiecesRechange>(this.apiUrl + 'piecerechange/getPiecerechangeById/?id=' + id , this.httpOptions)
 
}  


// HttpClient API post() method => Create deletePiecerechange


createPiecesRechange(piecerechange:any): Observable<PiecesRechange> {
  
  console.log(piecerechange);

  return this.http.post<PiecesRechange>(this.apiUrl + 'piecerechange/add', JSON.stringify(piecerechange), this.httpOptions)
}
Upload( data:any): Observable<HttpEvent<any>> {
   

  const req = new HttpRequest('POST', this.apiUrl+'piecerechange/upload', data, {

    reportProgress: true,

    responseType: 'json'


  });

  return this.http.request(req);
}


// HttpClient API put() method => Update deletePiecerechange

updatePiecesRechange(id:any, piecerechange:any): Observable<PiecesRechange> {
  piecerechange.id=id;
  console.log(piecerechange)
  return this.http.post<PiecesRechange>(this.apiUrl + 'piecerechange/updatePiecerechange?id' + id, piecerechange, this.httpOptions)
  
}

// HttpClient API delete() method => Delete deletePiecerechange 
deletePiecesRechange(id:any){
  return this.http.get<PiecesRechange>(this.apiUrl + 'piecerechange/deletePiecerechange?id=' + id, this.httpOptions)
 
}
deletePiecerechangeWithFournisseurNoPermitted(id:any){
  return this.http.get<PiecesRechange>(this.apiUrl + 'piecerechange/deletePiecerechangeWithFournisseurNoPermitted?id=' + id, this.httpOptions)
 
}
/******************* Api Fournisseur ******************/



AllFournisseur(): Observable<Fournisseur> {
  //console.log(length)
//alert(length)
  return this.http.get<Fournisseur>(this.apiUrl +'fournisseur')

  
}

// HttpClient API get() method => Fetch deletePiecerechange
getFournisseurById(id:any): Observable<Fournisseur> {
  return this.http.get<Fournisseur>(this.apiUrl + 'fournisseur/getFournisseurById/?id=' + id , this.httpOptions)
 
}  


// HttpClient API post() method => Create deletePiecerechange
createFournisseur(fournisseur:any): Observable<Fournisseur> {
  console.log(fournisseur);

  return this.http.post<Fournisseur>(this.apiUrl + 'fournisseur/createFournisseur', JSON.stringify(fournisseur), this.httpOptions)
}  

// HttpClient API put() method => Update deletePiecerechange

updateFournisseur(id:any, fournisseur:any): Observable<Fournisseur> {
  fournisseur.id=id;
  console.log(fournisseur)
  return this.http.post<Fournisseur>(this.apiUrl + 'fournisseur/updateFournisseur?id' + id, fournisseur, this.httpOptions)
  
}

// HttpClient API delete() method => Delete deletePiecerechange 
deleteFournisseurFinale(id:any){
  return this.http.get<Fournisseur>(this.apiUrl + 'fournisseur/deleteFournisseur?id=' + id, this.httpOptions)
 
}
// HttpClient API delete() method => Delete deletePiecerechange 
deletefournisseur(id:any){
  return this.http.get<Fournisseur>(this.apiUrl + 'fournisseur/deleteFournisseurWithPiecesNoPermitted?id=' + id, this.httpOptions)
 
}


/************* Api gestion de demande des pieces ***************/

AllDemandedePiece(): Observable<Demandepiece> {
  //console.log(length)
//alert(length)
  return this.http.get<Demandepiece>(this.apiUrl +'demandepiece')
}
// getinterventionwithetatattenddespieces(): Observable<Intervention> {
//   console.log(length)
//   return this.http.get<Intervention>(this.apiUrl +'intervention/getinterventionwithetatattenddespieces')
// }
getDemandeGroupbyIn(): Observable<Demandepiece>{
  
    return this.http.get<Demandepiece>(this.apiUrl +'demandepiece/getDemandeGroupbyIn')
}
//create gestion de demande de pieces
createDemandedePiece(demandepiece:any): Observable<Demandepiece> {
  console.log(demandepiece);
  return this.http.post<Demandepiece>(this.apiUrl + 'demandepiece/createDemandedePiece', JSON.stringify(demandepiece), this.httpOptions)
}
//get by id demande de gestion de pieces
getdemandepieceById(id:any): Observable<Demandepiece> {
  return this.http.get<Demandepiece>(this.apiUrl + 'demandepiece/getdemandepieceById/?id=' + id , this.httpOptions)
 
}  
updatedemandepiece(id:any): Observable<Demandepiece> {
  return this.http.get<Demandepiece>(this.apiUrl + 'demandepiece/updatedemandepiece/?id=' + id , this.httpOptions)
 
}  

updateDemandepiece(id:any): Observable<Intervention> {
  return this.http.post<Intervention>(this.apiUrl + 'demandepiece/updateDemandepiece', id , this.httpOptions)
 
} 




/******************* Api Ligne ******************/



AllLigne(): Observable<Ligne> {
  //console.log(length)
//alert(length)
  return this.http.get<Ligne>(this.apiUrl +'ligne')

  
}

// HttpClient API get() method => Fetch deletePiecerechange
getLigneById(id:any): Observable<Ligne> {
  return this.http.get<Ligne>(this.apiUrl + 'ligne/getLigneById/?id=' + id , this.httpOptions)
 
}  
  
// HttpClient API post() method => Create deletePiecerechange
createLigne(ligne:any): Observable<Ligne> {
  console.log(ligne);

  return this.http.post<Ligne>(this.apiUrl + 'ligne/createLigne', JSON.stringify(ligne), this.httpOptions)
}  

// HttpClient API put() method => Update deletePiecerechange

updateLigne(id:any, ligne:any): Observable<Ligne> {
  ligne.id=id;
  console.log(ligne)
  return this.http.post<Ligne>(this.apiUrl + 'ligne/updateLigne?id' + id, ligne, this.httpOptions)
  
}

// HttpClient API delete() method => Delete deletePiecerechange 
deleteLigne(id:any){
  return this.http.get<Ligne>(this.apiUrl + 'ligne/deleteLigne?id=' + id, this.httpOptions)
 
}
deleteLigneWithequipementNoPermitted(id:any){
  return this.http.get<Ligne>(this.apiUrl + 'ligne/deleteLigneWithequipementNoPermitted?id=' + id, this.httpOptions)
 
}


addEquipement( eq:any): Observable<Equipement> {
  
  console.log(eq)
  return this.http.post<Equipement>(this.apiUrl + 'equipement/add' ,eq, this.httpOptions)
  
}


upload( data:any): Observable<HttpEvent<any>> {
   

  const req = new HttpRequest('POST', this.apiUrl+'equipement/upload', data, {

    reportProgress: true,

    responseType: 'json'


  });

  return this.http.request(req);
}

createetatequipement(etatequipement:any): Observable<Etatequipement> {
  console.log(etatequipement);

  return this.http.post<Etatequipement>(this.apiUrl + 'etatequipement/createEtatEquipement', JSON.stringify(etatequipement), this.httpOptions)
} 
getEquipementStats() {
  return this.http.get(this.apiUrl +'etatequipement/getEquipementStats')

}


AllEtatequipement(): Observable<Etatequipement> {
  //console.log(length)
//alert(length)
  return this.http.get<Etatequipement>(this.apiUrl +'etatequipement')

  
}
 // HttpClient API get() method => Fetch Technicien list
 getTechniciens(): Observable<Technicien> {
  //console.log(length)

  return this.http.get<Technicien>(this.apiUrl + 'technicien')

 
}

// HttpClient API get() method => Fetch Technicien
getTechnicien(id:any): Observable<Technicien>{
  return this.http.get<Technicien>(this.apiUrl + 'technicien/getTechnicienById/?id=' + id , this.httpOptions)
 
}  


// HttpClient API post() method => Create Technicien
createTechnicien(technicien:any): Observable<Technicien> {
  console.log(technicien);

  return this.http.post<Technicien>(this.apiUrl + 'technicien/createTechnicien', JSON.stringify(technicien), this.httpOptions)
}  

// HttpClient API put() method => Update Technicien

updateTechnicien(id:any, technicien:any): Observable<Technicien> {
  technicien.id=id;
  console.log(technicien)
  return this.http.post<Technicien>(this.apiUrl + 'technicien/updateTechnicien?id' + id, technicien, this.httpOptions)
  
}

// HttpClient API delete() method => Delete Technicien 
deleteTechnicien(id:any){
  return this.http.get<Technicien>(this.apiUrl + 'technicien/deleteTechnicien?id=' + id, this.httpOptions)
 
}
// HttpClient API delete() method => Delete Technicien 
DeleteTechnicien(id:any){
  return this.http.get<Technicien>(this.apiUrl + 'technicien/deleteTechnicienWithOrdreNoPermitted?id=' + id, this.httpOptions)
 
}

 // HttpClient API get() method => Fetch Employee list
 




// HttpClient API post() method => Create Employee


// HttpClient API put() method => Update Employee



// HttpClient API delete() method => Delete Employee 


// HttpClient API get() method => Fetch Employee list
getEmployees(): Observable<Employee> {
  //console.log(length)

  return this.http.get<Employee>(this.apiUrl + 'employee')

 
}

// HttpClient API get() method => Fetch Employee
getEmployee(id:any): Observable<Employee> {
  return this.http.get<Employee>(this.apiUrl + 'employee/getEmployeeById/?id=' + id , this.httpOptions)
 
}  


// HttpClient API post() method => Create Employee
createEmployee(employee:any): Observable<Employee> {
  console.log(employee);

  return this.http.post<Employee>(this.apiUrl + 'employee/createEmployee', JSON.stringify(employee), this.httpOptions)
}  

// HttpClient API put() method => Update Employee

updateEmployee(id:any, employee:any): Observable<Employee> {
  employee.id=id;
  console.log(employee)
  return this.http.post<Employee>(this.apiUrl + 'employee/updateEmployee?id' + id, employee, this.httpOptions)
  
}

// HttpClient API delete() method => Delete Employee 
deleteEmployeeFinale(id:any){
  return this.http.get<Employee>(this.apiUrl + 'employee/deleteEmployee?id=' + id, this.httpOptions)
 
}
DeleteTechnicienFinal(id:any){
  return this.http.get<Employee>(this.apiUrl + 'technicien/deleteTechnicien?id=' + id, this.httpOptions)
 
}
// HttpClient API delete() method => Delete Employee 
DeleteEmployee(id:any){
  return this.http.get<Employee>(this.apiUrl + 'employee/deleteEmployeeWithDemandeInterventionNoPermitted?id=' + id, this.httpOptions)
 
}

 // HttpClient API get() method => Fetch Employee list
 getAdmins(): Observable<Admin> {
  //console.log(length)

  return this.http.get<Admin>(this.apiUrl + 'admin')

 
}

// HttpClient API get() method => Fetch Employee
getAdmin(id:any): Observable<Admin> {
  return this.http.get<Admin>(this.apiUrl + 'admin/getAdminById/?id=' + id , this.httpOptions)
 
}  


// HttpClient API post() method => Create Employee
createAdmin(admin:any): Observable<Admin> {
  console.log(admin);

  return this.http.post<Admin>(this.apiUrl + 'admin', JSON.stringify(admin), this.httpOptions)
}  

// HttpClient API put() method => Update Employee

updateAdmin(id:any, admin:any): Observable<Admin> {
  admin.id=id;
  console.log(admin)
  return this.http.post<Admin>(this.apiUrl + 'admin/updateAdmin?id=' + id, admin, this.httpOptions)
  
}

// HttpClient API delete() method => Delete Employee 
deleteAdmin(id:any){
  
  return this.http.get<Admin>(this.apiUrl + 'admin/deleteAdmin?id=' + id, this.httpOptions)
 
}
// HttpClient API get() method => Fetch get Ordreintervention selon le user connecte
getOrdreSelonUserConnected(id:any): Observable<Ordreintervention> {
  console.log('fff'+id)
  return this.http.get<Ordreintervention>(this.apiUrl + 'ordreintervention/getOrdreSelonUserConnected?idTech='+id, this.httpOptions)

 
}

// HttpClient API get() method => Fetch List OrdreInterventionNonTraité
getlistordreInterventionNontraite(id:any): Observable<Ordreintervention> {
  console.log('ordre No traité'+id)
  return this.http.get<Ordreintervention>(this.apiUrl + 'ordreintervention/getListOrdreInterventionNontraite?idTech='+id, this.httpOptions)
 
}
// HttpClient API get() method => Fetch List traité
getListOrdreInterventionTraite(id:any): Observable<Ordreintervention> {
  console.log('ordre traité'+id)

  return this.http.get<Ordreintervention>(this.apiUrl + 'ordreintervention/getListOrdreInterventiontraite?idTech='+id, this.httpOptions)
 
}


UpdateEtatResolu(iddem:string,id:string,status:any,equipement:string): Observable<Demandeintervention>{
  console.log('update status demande '+status)
  return this.http.post<Demandeintervention>(this.apiUrl + 'demandeintervention/UpdateEtatResolu',{idDem:iddem,id:id,status:status,equipement:equipement}, this.httpOptions)

}
UpdateEtat(id:string,ido:string,etat:any): Observable<Ordreintervention> {
 // console.log("iddd"+id)
  console.log('update etat ordre '+etat)
  //console.log('update etat description '+description)

  return this.http.post<Ordreintervention>(this.apiUrl + 'ordreintervention/UpdateEtat',{id:id,etat:etat,idOrdre:ido}, this.httpOptions)
}

ChangeEtatSuspenduAdmin(iddem:string,id:string,idin:string,etat:any ): Observable<Intervention> {
  // console.log("iddd"+id)
   console.log('update etat ordre '+etat)
   //console.log('update etat description '+description)
 
   return this.http.post<Intervention>(this.apiUrl + 'intervention/ChangeEtatSuspenduAdmin',{idDem:iddem,idIn:idin,id:id,etat:etat}, this.httpOptions)
 }

 ChangeEtatSuspenduAdminWithequip(iddem:string,id:string,idin:string,etat:any,equipement:string): Observable<Intervention> {
  // console.log("iddd"+id)
   console.log('update etat ordre '+etat)
   //console.log('update etat description '+description)
   console.log('update etat equipement '+equipement)

   return this.http.post<Intervention>(this.apiUrl + 'intervention/ChangeEtatSuspenduAdmin',{idDem:iddem,idIn:idin,id:id,etat:etat,equipement:equipement}, this.httpOptions)
 }

Updatestatus(id:string ,ido:string,etat:any,description:any): Observable<Ordreintervention> {
    //console.log("iddd"+id)
    console.log('update status demande '+etat)
    console.log('update status description '+description)
  
    return this.http.post<Ordreintervention>(this.apiUrl + 'ordreintervention/Updatestatus',{idOrdre:ido,etat:etat,description:description,id:id}, this.httpOptions) 
}
UpdatestatusEnattente(obj:any): Observable<Intervention> {
  //console.log("iddd"+id id:string ,ido:string id:id,idOrdre:ido,)
 
  //alert(etat)
  // console.log('ajouter explication '+explication)
  return this.http.post<Intervention>(this.apiUrl + 'intervention/UpdatestatusEnattente',obj, this.httpOptions) 
}
changeEtat(id:any,etat:any): Observable<Intervention> {
  console.log("iddd"+id)
  console.log('update etat ordre '+etat)

  return this.http.post<Intervention>(this.apiUrl + 'intervention/UpdateEtat',{id,etat}, this.httpOptions)
}

updateEtat(id:any,etat:any): Observable<Demandeintervention> {
  console.log("iddd"+id)
  console.log('update etat ordre '+etat)

  return this.http.post<Demandeintervention>(this.apiUrl + 'intervention/UpdateEtat',{id,etat}, this.httpOptions)
}

ChangeEtat(id:any,ido:string,etat:any,description:any): Observable<Ordreintervention> {
  console.log("iddd"+id)
  console.log('change etat ordre '+etat)
  console.log('change etat description '+description)

  return this.http.post<Ordreintervention>(this.apiUrl + 'ordreintervention/ChangeEtat',{id:id,etat:etat,
    description:description,idOrdre:ido}, this.httpOptions)
}


// HttpClient API post() method => Create tache
createTache(tache:any): Observable<Tache> {
  console.log(tache);

  return this.http.post<Tache>(this.apiUrl + 'tache/createTache', JSON.stringify(tache), this.httpOptions)
}  

// HttpClient API put() method => Update Tache

updatetache(id:any, tache:any): Observable<Tache> {
  tache.id=id;
  console.log(tache)
  return this.http.post<Tache>(this.apiUrl + 'tache/updateTache?id' + id, tache, this.httpOptions)
  
}

deleteTache(id:any){
  return this.http.get<Tache>(this.apiUrl + 'tache/deleteTache?id=' + id, this.httpOptions)
 
}
getTacheById(id:any): Observable<Tache> {
  return this.http.get<Tache>(this.apiUrl + 'tache/getTacheById?id=' + id, this.httpOptions)

  
}
//message
sendmessage (message:any) {
  return this.http.post(this.apiUrl + 'message',message) 
}
getmessage(): Observable<Message> {
  return this.http.get<Message>(this.apiUrl+'message')
 
} 

deletemessage(id:any): Observable<Message> {
  return this.http.get<Message>(this.apiUrl+'message/delete?id='+id,this.httpOptions)
 
} 
countmessage(){
  return this.http.get(this.apiUrl+'message/count')

}

getimprimante(id:any): Observable<Blob> {
  return this.http.get(this.apiUrl + 'intervention/printPDF/?id=' + id, {...this.httpOptions, responseType: 'blob'});
}

}
