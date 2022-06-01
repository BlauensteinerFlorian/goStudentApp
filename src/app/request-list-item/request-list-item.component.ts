import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Offer } from '../shared/offer';
import { OfferService } from '../shared/offer.service';
import { Request } from '../shared/request';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'gs-request-list-item',
  templateUrl: './request-list-item.component.html',
  styles: [
  ]
})
export class RequestListItemComponent implements OnInit {
  @Input() request: Request | undefined;

  constructor(private authService: AuthenticationService, private requestService: RequestService, private router: Router, private route: ActivatedRoute,
    private offerService: OfferService) { }


  ngOnInit(): void {
  }

  isOfferOwner(){
    return this.authService.getCurrentUserId() == this.request?.user?.id;
  }

  isTutor(){
    return this.authService.isTutor();
  }

  acceptRequest(){
    if (this.request?.id && confirm('Anfrage wirklich annehmen?')) {
      const req: Request = this.request;
      req.state = "Anfrage angenommen";
      this.requestService.update(req).subscribe(res => 
      {
        let offer: Offer = req.offer;
        console.log(req);
        offer.state = "Angebot vergeben";
        offer.student_id = req.user_id;
        this.offerService.update(offer).subscribe(res => 
        {
            this.router.navigate(['../../profile'], { relativeTo: this.route })
        });
      });
    }
  }

  declineRequest(){
    if (this.request?.id && confirm('Anfrage wirklich ablehnen?')) {
      const req: Request = this.request;
      req.state = "Anfrage abgelehnt";
      this.requestService.update(req)
        .subscribe(res => this.router.navigate(['../'], {
          relativeTo:
            this.route
        }));
    }
  }

}
