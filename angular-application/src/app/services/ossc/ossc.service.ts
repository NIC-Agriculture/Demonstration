import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OsscService {
  serverUrl: string = environment.serverUrl
  route: string = 'ossc';
  withCredential: object = {
    withCredentials: true
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAllDistrict(): Observable<any> {
    return this.http.get(`${this.serverUrl}/scheme/getAllDistrict`)
  }

  getDistrictSeedReport(Dist_Code: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDistrictSeedReport?Dist_Code=${Dist_Code}`)
  }
}
