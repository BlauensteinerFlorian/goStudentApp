import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from '../shared/offer';
import { OfferService } from '../shared/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'gs-offer-details',
  templateUrl: './offer-details.component.html',
  styles: [
  ]
})
export class OfferDetailsComponent implements OnInit {
  offer: Offer | undefined;

  constructor(private os: OfferService, private route: ActivatedRoute, private router: Router,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.os.getSingle(params['id']).subscribe(offer => this.offer = offer);
    //this.offer = this.os.getSingle(params['id']);
  }

  removeOffer() {
    if (this.offer?.id && confirm('Nachhilfeangebot wirklich löschen?')) {
      this.os.remove(this.offer.id.toString())
        .subscribe(res => this.router.navigate(['../'], {
          relativeTo:
            this.route
        }));
    }
  }

}
