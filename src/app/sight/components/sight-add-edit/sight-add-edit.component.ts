import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sight-add-edit',
  templateUrl: './sight-add-edit.component.html',
  styleUrls: ['./sight-add-edit.component.scss']
})
export class SightAddEditComponent implements OnInit {
  fGroup: FormGroup;

  constructor() {
    this.fGroup = new FormGroup({
      name: new FormControl(),
      longitude: new FormControl(),
      latitude: new FormControl(),
      country: new FormControl(),
      description: new FormControl(),
      color: new FormControl()
    });

  }

  ngOnInit(): void {
  }

  submit(): void {

  }
}
