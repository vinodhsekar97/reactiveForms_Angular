import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular1';
  countryList = [];
  stateList = [];
  cityList = [];
  profileForm: FormGroup;
  constructor() {
    this.profileForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{2,}'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9+-]{4,13}'),
      ]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rpass: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      food: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{2,}'),
      ]),
      color: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{2,}'),
      ]),
    });
    this.profileForm.get('country').valueChanges.subscribe((val) => {
      this.updateStateList(val);
      this.cityList = [];
    });
    this.profileForm.get('state').valueChanges.subscribe((val) => {
      this.updateCityList(val);
    });
    this.countryList = this.data;
  }

  updatePatt() {
    this.profileForm
      .get('rpass')
      .setValidators([
        Validators.required,
        Validators.pattern(this.profileForm.get('pass').value),
      ]);
    this.profileForm
      .get('rpass')
      .updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }
  consoleDetails() {
    console.log(this.profileForm.value);
  }

  updateStateList(countryCode) {
    this.countryList.forEach((country) => {
      if (country.code == countryCode) {
        this.stateList = country.states;
      }
    });
    this.profileForm.get('state').setValue('');
  }

  updateCityList(stateCode) {
    this.stateList.forEach((state) => {
      if (state.code == stateCode) {
        this.cityList = state.cities;
      }
    });
    this.profileForm.get('city').setValue('');
  }

  data = [
    {
      name: 'India',
      code: 'IND',
      states: [
        {
          name: 'TamilNadu',
          code: 'TN',
          cities: [
            { name: 'Chennai', code: 'CHN' },
            { name: 'Coimbatore', code: 'CBE' },
          ],
        },
        {
          name: 'Kerala',
          code: 'KL',
          cities: [
            { name: 'Palakad', code: 'PLK' },
            { name: 'Chochin', code: 'CHN' },
          ],
        },
      ],
    },
    {
      name: 'United States of America',
      code: 'USA',
      states: [
        {
          name: 'NewYork',
          code: 'NY',
          cities: [
            { name: 'NY city', code: 'NYC' },
            { name: 'Someothercity', code: 'SOC' },
          ],
        },
        {
          name: 'California',
          code: 'CA',
          cities: [
            { name: '‎Los Angeles	', code: 'LA' },
            { name: 'Sacramento', code: 'SA' },
          ],
        },
      ],
    },
  ];
}