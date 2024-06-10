import { Component, OnInit } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent implements OnInit {

  constructor(

  ) {

  }

  ngOnInit(): void {

  };

  focusOnNext(inputEl: InputNumber) {
    inputEl.input.nativeElement.focus();
  }

}
