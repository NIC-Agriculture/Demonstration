import { Component, OnInit } from '@angular/core';
import { LayoutserviceService } from '../services/layoutservice.service';
declare const $: any;
declare function loadDetails(): any;
declare function loadCurrencyForm(): any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  pageHeading: string;
  pageHeadingDesc: string;
  breadcrumbList: Array<string>;
  constructor(
    private layoutService: LayoutserviceService
  ) {
    this.pageHeading = 'Dashboard';
    this.pageHeadingDesc = 'Easy to customise core stylesheets';
    this.breadcrumbList = ['Dashboard'];
  }

  ngOnInit(): void {
    this.layoutService.title.subscribe(value => this.pageHeading = value);
    this.layoutService.breadcrumb.subscribe((value: any) => this.breadcrumbList = value);
    this.layoutService.pageHeadingDesc.subscribe((value: any) => this.pageHeadingDesc = value);
    setTimeout(() => {
      $('.theme-loader').fadeOut(1000);
      loadDetails();
    })
  }

}

