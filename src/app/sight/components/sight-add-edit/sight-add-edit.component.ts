import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../../models/country';
import {SightseeingPoint} from '../../../models/sightseeing-point';
import {ActivatedRoute} from '@angular/router';
import {SightsService} from '../../../services/sights.service';
import {longitude} from '../validators/longitude';
import {latitude} from '../validators/latitude';

@Component({
  selector: 'app-sight-add-edit',
  templateUrl: './sight-add-edit.component.html',
  styleUrls: ['./sight-add-edit.component.scss']
})
export class SightAddEditComponent implements OnInit {
  fGroup: FormGroup;
  countries: Country[];
  sightId: string;
  succeed = false;
  colors: [number, string][] = [...SightseeingPoint.colors()];

  constructor(private route: ActivatedRoute, private sightsService: SightsService) {
    this.fGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required, longitude()]),
      latitude: new FormControl('', [Validators.required, latitude()]),
      country: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(256)]),
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

    this.fGroup.valueChanges.subscribe(() => console.log(this.fGroup.controls));
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
    request.subscribe(() => {
      alert('Operation successfully ended');
      this.succeed = true;
    });
  }

  showError(controlName: string, errorName: string): boolean {
    const control = this.fGroup.get(controlName);
    return (control.touched && control?.errors?.[errorName]);
  }
}
