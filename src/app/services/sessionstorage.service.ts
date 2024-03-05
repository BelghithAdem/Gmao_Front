import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  constructor() { }

 // Enregistrer des données dans sessionStorage

 public set(key: string, value: any){
  localStorage.setItem(key, JSON.stringify(value));
}
  
  
  public get(key: string): any {
    const value = localStorage.getItem(key);
    return value && value !== 'undefined' ? JSON.parse(value) : null;
  }

// Supprimer des données de sessionStorage

remove(key: string): void {
  localStorage.removeItem(key);
}
  // Supprimer toutes les données de sessionStorage

  clear() {
    localStorage.clear();
  }
  
}
