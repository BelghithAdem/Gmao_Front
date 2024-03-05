import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map,  } from 'rxjs/operators';
import { SessionstorageService } from '../services/sessionstorage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  
  constructor(private sessionstorageService: SessionstorageService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.sessionstorageService.get('token')) {                                          
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}