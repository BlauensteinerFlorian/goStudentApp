import { Component, OnInit } from '@angular/core';
import { Offer } from '../shared/offer';
import { OfferService } from '../shared/offer.service';

@Component({
  selector: 'gs-offer-list',
  templateUrl: './offer-list.component.html',
  styles: []
})
export class OfferListComponent implements OnInit {

  offers: Offer[] = [];

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offers = this.offerService.getAll();
  }

}
