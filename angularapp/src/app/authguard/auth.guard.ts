import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthguardComponent implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser.pipe(
      map(currentUser => {
        if (currentUser && currentUser.UserRole) {
          // Check if the user has the appropriate role
          const requiredRoles = route.data.roles;
          if (requiredRoles && requiredRoles.indexOf(currentUser.UserRole) === -1) {
            // Role not authorized, redirect to error page
            this.router.navigate(['/error']);
            return false;
          }
          // Authorized, return true
          return true;
        }
 
        // Not logged in or missing role, redirect to login page
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
  }