import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // serverUrl:string='http://localhost:80'
  serverUrl: string = environment.serverUrl
  route: string = 'auth';
  withCredential: object = {
    withCredentials: true
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  getUserRole() {
    return localStorage.getItem('role');
  }
  setUserRole(role: string) {
    return localStorage.setItem('role', role);
  }
  getUserName() {
    return localStorage.getItem('userName');
  }
  setUserName(userName: string) {
    return localStorage.setItem('userName', userName);
  }
  getUserId() {
    return localStorage.getItem('userId');
  }
  setUserId(userId: string) {
    return localStorage.setItem('userId', userId);
  }
  getUserBlockCode() {
    return localStorage.getItem('Block_Code');
  }
  setUserBlockCode(Block_Code: string) {
    return localStorage.setItem('Block_Code', Block_Code);
  }
  getUserDistCode() {
    return localStorage.getItem('Dist_Code');
  }
  setUserDistCode(Dist_Code: string) {
    return localStorage.setItem('Dist_Code', Dist_Code);
  }

  clearLocalStorage() {
    localStorage.clear();
    return true;
  }

  signIn(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/signIn`, data);
  }

  checkUserPemission(Role: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/checkUserPemission/${Role}`);
  }
  goToLoginPage() {
    window.location.replace('/login');
  }

  signOut() {
    this.http.get(`${this.serverUrl}/${this.route}/signOut`, this.withCredential).subscribe(result => {
      if(result) {
        this.clearLocalStorage();
        // this.goToLoginPage();
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Unable Signout. Try Again');
      }
    }, error => {
      console.log(error.statusCode);      
      this.toastr.error('Unable to sign-out, PLease try again.');
    })
  }

  changePassword(password: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/changePassword`, password)
  }
}
