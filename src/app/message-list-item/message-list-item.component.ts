import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../shared/message';

@Component({
  selector: 'gs-message-list-item',
  templateUrl: './message-list-item.component.html',
  styles: [
  ]
})
export class MessageListItemComponent implements OnInit {
@Input() message: Message | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
