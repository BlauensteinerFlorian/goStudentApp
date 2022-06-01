import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Offer } from '../shared/offer';
import { OfferService } from '../shared/offer.service';

@Component({
  selector: 'gs-offer-list',
  templateUrl: './offer-list.component.html',
  styles: []
})
export class OfferListComponent implements OnInit {

  offers: Offer[] = [];

  constructor(private offerService: OfferService, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    const routePath = this.route.snapshot.url[0].path;
    if (params['subjectid']) {
      this.offerService.getBySubjectId(params['subjectid']).subscribe(res => {
        this.offers = res
        console.log(res);
      });
    }
    else if (routePath == "profile") {
      const currentuserId = this.authService.getCurrentUserId();
      this.offerService.getbyUserId(currentuserId.toString()).subscribe(res => {
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
