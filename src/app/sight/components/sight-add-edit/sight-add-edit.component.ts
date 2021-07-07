import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../../models/country';
import {SightseeingPoint} from '../../../models/sightseeing-point';

@Component({
  selector: 'app-sight-add-edit',
  templateUrl: './sight-add-edit.component.html',
  styleUrls: ['./sight-add-edit.component.scss']
})
export class SightAddEditComponent implements OnInit {
  fGroup: FormGroup;
  countries: Country[];
  colors: { id: number, value: string }[];

  constructor() {
    this.fGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required])
    });

    this.countries = [
      {
        name: 'POLAND',
        iata_code: 'PL'
      },
      {
        name: 'ENGLAND',
        iata_code: 'EN'
      },
      {
        name: 'GREAT BRITAIN',
        iata_code: 'GB'
      }
    ];

    this.colors = this.getColors();
  }

  ngOnInit(): void {
  }

  submit(): void {

  }

  getColors(): { id: number, value: string }[] {
    const values: { id: number, value: string }[] = [];

    for (const pair of SightseeingPoint.colors()) {
      values.push({id: pair[0], value: pair[1]});
    }
    console.log(values);
    return values;
  }
}
