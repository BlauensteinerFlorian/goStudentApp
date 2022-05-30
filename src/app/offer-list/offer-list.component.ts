import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../shared/offer';
import { OfferService } from '../shared/offer.service';

@Component({
  selector: 'gs-offer-list',
  templateUrl: './offer-list.component.html',
  styles: []
})
export class OfferListComponent implements OnInit {

  offers: Offer[] = [];

  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    if (params['subjectid']) {
      this.offerService.getBySubjectId(params['subjectid']).subscribe(res => {
        this.offers = res
        console.log(res);
      });
    }
    else if (params['userid']) {
      this.offerService.getAll().subscribe(res => {
        this.offers = res
        console.log(res);
      });
    }
    else {
      this.offerService.getAll().subscribe(res => {
        this.offers = res
        console.log(res);
      });
    }

  }

}
