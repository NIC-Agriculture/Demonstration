import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stateplan-payment-file',
  templateUrl: './stateplan-payment-file.component.html',
  styleUrls: ['./stateplan-payment-file.component.css']
})
export class StateplanPaymentFileComponent implements OnInit {
  @Input () pymntDetails: Array<any> = []

  constructor() { }

  ngOnInit(): void {
  }

}
