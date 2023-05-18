import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-generate-demonstration',
  templateUrl: './generate-demonstration.component.html',
  styleUrls: ['./generate-demonstration.component.css']
})
export class GenerateDemonstrationComponent implements OnInit {
  @Input() GpTargetDetails:any = {};
  userName: any = '';
  BlockName: any;
  constructor(
    private baoService:BaoServiceService,
    private authservice : AuthServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userName = this.authservice.getUserName();
    //  console.log(this.GpTargetDetails);
     this.getBlockName()
    
  }
   getBlockName = () => {;
    this.BlockName = this.userName.substr(5);
   }
}
