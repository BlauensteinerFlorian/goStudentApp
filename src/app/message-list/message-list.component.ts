import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Message } from '../shared/message';
import { MessageService } from '../shared/message.service';
import { Offer } from '../shared/offer';

@Component({
  selector: 'gs-message-list',
  templateUrl: './message-list.component.html',
  styles: [
  ]
})
export class MessageListComponent implements OnInit {
  @Input() offer: Offer | undefined;
  messages: Message[] = [];

  constructor(private messageService: MessageService, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.offer && this.offer.id){

      this.messageService.getByOfferId(this.offer.id.toString()).subscribe(res => {
        this.messages = res;
      });
    }
    else{
      this.messageService.getByUserId(this.authService.getCurrentUserId().toString()).subscribe(res => {
        console.log(res);
        console.log("testtt");
        this.messages = res;
      });
    }
  }

}
