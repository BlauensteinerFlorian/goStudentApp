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
      if(this.authService.isLoggedIn() && !this.authService.isTutor()){
        this.request = RequestFactory.empty();
        this.request.offer_id = offerId;
        this.request.user_id = this.authService.getCurrentUserId();
        this.requestService.getByUserIdAndOfferId(this.request).subscribe(req => {
          this.request = req;
        });
      }
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
    const req: Request = RequestFactory.fromObject({offer_id: this.offer?.id ,user_id: this.authService.getCurrentUserId(), state: "Ausstehend"});
    console.log(req);

    this.requestService.create(req).subscribe(res => {
      console.log(res);
      this.router.navigate(['../../profile'], { relativeTo: this.route })
    });
  }

  isOfferOwner(){
    if(this.offer?.user_id == this.authService.getCurrentUserId())
      return true;
    return false;
  }

  alreadyCreatedARequest()
  {
    return this.request?.user_id;
  }

  getRequestButtonLabel(){
    return this.alreadyCreatedARequest() ? "Anfrage bereits gesendet" : "Anfrage senden";
  }

  sendMessage(){

  }

}
