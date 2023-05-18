import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | null;

   constructor(
    private authservice : AuthServiceService,
    private router: Router
  ) {
    this.userName = this.authservice.getUserName();
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authservice.signOut();
  }

  changePassword = () => {   
    switch ((this.authservice.getUserRole()) as any) {
        case 'SCHEME': {
          this.router.navigate(['/scheme/changePassword'])
          break;
        }
        case 'CDAO': {
          this.router.navigate(['/cdao/changePassword']);
          break;
        }
        case 'BAO': {
          this.router.navigate(['/bao/changePassword']);
          break;
        }
        case 'ADO': {
          this.router.navigate(['/ado/changePassword']);
          break;
        }
        case 'VAW': {
          this.router.navigate(['/vaw/changePassword']);
          break;
        }
        case 'OSSC': {
          this.router.navigate(['/ossc/changePassword']);
          break;
        }
    
    }

  }

}
