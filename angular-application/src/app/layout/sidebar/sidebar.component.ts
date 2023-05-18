import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  userRole: string | null = '';
  userName: string | null = '';

  constructor(
    private authservice : AuthServiceService
  ) {
    this.userName = this.authservice.getUserName();
    this.userRole = this.authservice.getUserRole();
  }

  ngOnInit(): void {
  }

  // signOut() {
  //   this.authservice.signOut();
  // }


}
