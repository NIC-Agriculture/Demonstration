import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutserviceService {
  // serverUrl:string='http://localhost:80'
  serverUrl: string = environment.serverUrl
  route: string = 'api';
  withCredential: object = {
    withCredentials: true
  }

  private defaultTitle = 'Page Title';
  private titleSubject: BehaviorSubject<string> = new BehaviorSubject(this.defaultTitle);
  public title: Observable<string>;

  private breadcrumbSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public breadcrumb: Observable<string>;

  private pageHeadingDescSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public pageHeadingDesc: Observable<string>;  

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.title = this.titleSubject.asObservable();
    this.breadcrumb = this.breadcrumbSubject.asObservable();
    this.pageHeadingDesc = this.pageHeadingDescSubject.asObservable();
  }
  public setTitle(title: string) {
      this.titleSubject.next(title);
  }
  public setBreadcrumb(breadcrumbList: any) {
      this.breadcrumbSubject.next(breadcrumbList);
  }
  public setPageHeadingDesc(describtion: any) {
      this.pageHeadingDescSubject.next(describtion);
  }

  getUserToken() {
    return localStorage.getItem('CSRFtoken');
  }
  setUserToken(token: string) {
    return localStorage.setItem('CSRFtoken', token);
  }

  getFinYear(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getFinYear`)
  }
}
