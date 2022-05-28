import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Offer } from '../shared/offer';
import { OfferService } from '../shared/offer.service';

@Component({
  selector: 'gs-offer-list',
  templateUrl: './offer-list.component.html',
  styles: []
})
export class OfferListComponent implements OnInit {

  offers: Offer[] = [];

  @Output() showDetailsEvent = new EventEmitter<Offer>();

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService.getAll().subscribe(res => this.offers = res);
  }

  showDetails(offer: Offer) {
    this.showDetailsEvent.emit(offer);
  }

}
