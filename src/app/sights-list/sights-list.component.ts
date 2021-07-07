import {Component, OnInit} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import {SightsService} from '../services/sights.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {SightDetailsComponent} from '../sight/components/sight-details/sight-details.component';

@Component({
  selector: 'app-sights-list',
  templateUrl: './sights-list.component.html',
  styleUrls: ['./sights-list.component.scss']
})
export class SightsListComponent implements OnInit {
  modalRef: BsModalRef;
  sights: SightseeingPoint[] = [];

  constructor(private sightsService: SightsService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.sightsService.getSights().subscribe(sights => {
      this.sights = sights;
    });
  }

  seeDetails(sight: SightseeingPoint): void {
    this.modalRef = this.modalService.show(SightDetailsComponent, {
      initialState: {sight}
    });
  }
}
