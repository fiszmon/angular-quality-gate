import {Component} from '@angular/core';
import {SightseeingPoint} from '../../../models/sightseeing-point';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sight-details',
  templateUrl: './sight-details.component.html',
  styleUrls: ['./sight-details.component.scss']
})
export class SightDetailsComponent {
  sight: SightseeingPoint;

  constructor(public bsModalRef: BsModalRef) {
  }

  close(): void {
    this.bsModalRef.hide();
  }
}
