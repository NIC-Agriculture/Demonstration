import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(
    private authservice: AuthServiceService,
    private toastr: ToastrService,
    private router: Router,
    ) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(async (resolve, reject) => {
        const result: any = await this.checkPermission(route.data.role);
        resolve(result);
    });
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return childRoute.url.length ? this.canActivate(childRoute, state) : true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise( async (resolve, reject) => {
        const result: any = await this.checkPermission(route.data?.role);
        resolve(result);
      })
  }


  checkPermission = (role: string) => {
    return new Promise( async (resolve, reject) => {
      try {
            const Role = role;
            
            const result = await this.authservice.checkUserPemission(Role).toPromise()
            if(result) return resolve(true);
            resolve(false);
            this.toastr.error('Invalid User. Sign in Again.');
            this.router.navigate([''])
      } catch(e) {
          console.error(e);
          resolve(false);
          this.toastr.error('Invalid User. Sign in Again.');
          this.router.navigate(['']);
      }
    })
  }

}
