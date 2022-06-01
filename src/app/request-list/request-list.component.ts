import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Offer } from '../shared/offer';
import { Request } from '../shared/request';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'gs-request-list',
  templateUrl: './request-list.component.html',
  styles: [
  ]
})
export class RequestListComponent implements OnInit {
  @Input() offer: Offer | undefined;
  requests: Request[] = [];

  constructor(private requestService: RequestService, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    const routePath = this.route.snapshot.url[0].path;

      if (routePath == "profile") {
      const currentuserId = this.authService.getCurrentUserId();
      this.requestService.getByUserId(currentuserId.toString()).subscribe(res => {
        this.requests = res;
      });
    }
    else if(this.offer && this.offer.id){
      this.requestService.getPendingRequestsByOfferId(this.offer.id.toString()).subscribe(res => {
        this.requests = res;
      });
    }
  }

}
