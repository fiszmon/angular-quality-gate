import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../../models/country';
import {SightseeingPoint} from '../../../models/sightseeing-point';
import {ActivatedRoute} from '@angular/router';
import {SightsService} from '../../../services/sights.service';

@Component({
  selector: 'app-sight-add-edit',
  templateUrl: './sight-add-edit.component.html',
  styleUrls: ['./sight-add-edit.component.scss']
})
export class SightAddEditComponent implements OnInit {
  fGroup: FormGroup;
  countries: Country[];
  colors: { id: number, value: string }[];
  sightId: string;

  constructor(private route: ActivatedRoute, private sightsService: SightsService) {
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

    this.colors = SightAddEditComponent.getColors();
  }

  private static getColors(): { id: number, value: string }[] {
    const values: { id: number, value: string }[] = [];

    for (const pair of SightseeingPoint.colors()) {
      values.push({id: pair[0], value: pair[1]});
    }
    return values;
  }

  ngOnInit(): void {
    this.sightId = this.route.snapshot.params.id;
    if (this.sightId) {
      this.getAndPatchValue();
    }
  }

  private getAndPatchValue(): void {
    this.sightsService.getSight(this.sightId).subscribe(sight => {
      this.fGroup.patchValue({
        ...sight,
        country: sight.country.iata_code
      });
    });
  }

  submit(): void {
    const country = this.countries.find(c => c.iata_code === this.fGroup.value.country);
    const sightAPI = new SightseeingPoint(
      this.fGroup.value.name,
      this.fGroup.value.longitude,
      this.fGroup.value.latitude,
      new Country(country.name, country.iata_code),
      this.fGroup.value.description,
      this.fGroup.value.color
    );
    if (this.sightId) {
      sightAPI.id = this.sightId;
    }
    const request = this.sightId ? this.sightsService.update(sightAPI) : this.sightsService.addNew(sightAPI);
    request.subscribe(() => alert('Operation successfully ended'));
  }
}
