import {Component, OnInit} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import {SightsService} from '../services/sights.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {SightDetailsComponent} from '../sight/components/sight-details/sight-details.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sights-list',
  templateUrl: './sights-list.component.html',
  styleUrls: ['./sights-list.component.scss']
})
export class SightsListComponent implements OnInit {
  modalRef: BsModalRef;
  sights: SightseeingPoint[] = [];

  constructor(private sightsService: SightsService, private modalService: BsModalService, private router: Router) {
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

  edit(id: string): boolean {
    // TODO consider rewrite it with usage of stopPropagation
    this.router.navigate([`sight/${id}`]).catch(console.error);
    return false;
  }
}
