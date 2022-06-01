import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from '../shared/offer';
import { OfferService } from '../shared/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Request } from '../shared/request';
import { RequestFactory } from '../shared/request-factory';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'gs-offer-details',
  templateUrl: './offer-details.component.html',
  styles: [
  ]
})
export class OfferDetailsComponent implements OnInit {
  offer: Offer | undefined;
  request: Request | undefined;

  constructor(private os: OfferService, private route: ActivatedRoute, private router: Router,
    public authService: AuthenticationService, private requestService: RequestService) { }

  ngOnInit(): void {
    const offerId = this.route.snapshot.params['id'];
    console.log(offerId)
    this.os.getSingle(offerId).subscribe(offer => {
      this.offer = offer;
      console.log(offer);
      this.requestService.getByUserIdAndOfferId({user_id: this.authService.getCurrentUserId().toString(), offer_id: offerId}).subscribe(req => {
        this.request = this.request;
        console.log(this.request);
      });
    });

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

  createRequest() {
    const req: Request = RequestFactory.fromObject({offer_id: this.offer?.id ,user_id: this.authService.getCurrentUserId(), state: "pending"});
    console.log(req);

    this.requestService.create(req).subscribe(res => {
      console.log(res);
    });
  }

  isOfferOwner(){
    if(this.offer?.user_id == this.authService.getCurrentUserId())
      return true;
    return false;
  }

  alreadyCreatedARequest()
  {
    const userid = this.authService.getCurrentUserId();

  }

  sendMessage(){

  }

}
