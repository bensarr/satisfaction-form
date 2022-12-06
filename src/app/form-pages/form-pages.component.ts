import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-pages',
  templateUrl: './form-pages.component.html',
  styleUrls: ['./form-pages.component.scss']
})
export class FormPagesComponent implements OnInit{

  step = 0;
  public saveForm!: FormGroup;
  plaintes = [
    'oui',
    'non'
  ]

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }
  onNextClick() {
    //TODO Need to verify first of all if form is valid
    if(
      (this.step == 0 && this.saveForm.get('name')?.valid && this.saveForm.get('phone')?.valid)
      ||
      (this.step == 1 && this.saveForm.get('plainte')?.valid && this.saveForm.get('plainte_text')?.valid)
      ||
      (this.step == 2 && this.saveForm.get('final-text')?.valid)
    )
    {
      this.spinner.show();
      setTimeout(() => {
        this.step++;
        this.spinner.hide();
      }, 1000);
    }
    else {
      if(this.step == 2 && this.saveForm.valid){
        this.spinner.show();
        setTimeout(() => {
          this.step = 0;
          this.saveForm.reset();
          this.spinner.hide();
        }, 2000);
        console.log(this.saveForm.value)
      }
    }
  }

  onResetClick() {
    this.spinner.show();
    setTimeout(() => {
      this.step--;
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit(): void {
    let MOBILE_PATTERN = /^((0[1-9])|(4[0-2])|(4[4-9])|(5[4-9])|(6[0-1])|6[5-7]|(7[5-9]))[0-9]{6}$//*/[0-9\+\-\ ]/;*/;
    this.saveForm = this.fb.group({
      name: [
        '',
        [Validators.required]
      ],
      phone:[
        '',
        [
          Validators.required,
          Validators.pattern(MOBILE_PATTERN)
        ]
      ],
      plainte:[
        [
          Validators.required
        ],
      ],
      plainte_text:[
        '',
      ],
      final_text:[
        '',
      ]
    });
  }

  sendDatas() {

  }
}
