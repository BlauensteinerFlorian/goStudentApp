import { Component } from '@angular/core';
import { Offer } from './shared/offer';

@Component({
  selector: 'gs-root',
  template: `<gs-offer-list *ngIf="offerListOn" (showDetailsEvent)="showDetails($event)"></gs-offer-list>
             <gs-offer-details *ngIf="offerDetailsOn" [offer]="offer" (showListEvent)="showList()"></gs-offer-details>`,
  styles: []
})
export class AppComponent {
  title = 'gostudentapp';

  offerListOn = true;
  offerDetailsOn = false;

  offer: Offer | undefined;

  showList() {
    this.offerListOn = true;
    this.offerDetailsOn = false;
  }

  showDetails(offer: Offer) {
    this.offer = offer;
    this.offerListOn = false;
    this.offerDetailsOn = true;
  }
}
