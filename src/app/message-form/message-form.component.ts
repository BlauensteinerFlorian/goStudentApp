import { ActivatedRoute, Router } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder, FormGroup, FormArray, Validators, FormControl
} from "@angular/forms";
import { AuthenticationService } from "../shared/authentication.service";
import { MessageFactory } from "../shared/message-factory";
import { MessageService } from "../shared/message.service";
import { Message } from "../shared/message";
import { UserService } from "../shared/user.service";
import { User } from "../shared/user";
import { MessageFormErrorMessages } from "./message-form-error-messages";
import { Offer } from "../shared/offer";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'gs-message-form',
  templateUrl: './message-form.component.html',
  styles: [
  ]
})
export class MessageFormComponent implements OnInit {
  @Input() offer: Offer | undefined;
  messageForm: FormGroup;
  message: Message = MessageFactory.empty();
  user: User | undefined;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.messageForm = this.fb.group({});
  }
  ngOnInit() {
    this.initMessage();
  }
  initMessage() {
    this.messageForm = this.fb.group({
      id: this.message.id,
      text: [this.message.text, Validators.required],
      user_id: [this.message.user_id, Validators.required],
      offer_id: [this.message.offer_id, Validators.required],
    });
    this.messageForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }
  submitForm() {
    const msg: Message = MessageFactory.fromObject(this.messageForm.value);

    this.userService.getSingle(this.authService.getCurrentUserId().toString()).subscribe(user => {
      msg.user = user
      msg.user_id = user.id;
      if(this.offer){
        msg.offer = this.offer;
        msg.offer_id = this.offer.id;
      }
      this.messageService.create(msg).subscribe(res => {
        this.message = MessageFactory.empty();
        this.messageForm.reset(MessageFactory.empty());
        this.router.navigate(["../../offers"], { relativeTo: this.route });
        this.toastr.success("Nachricht versendet.", "Erfolg");
      });
    });
  }
  updateErrorMessages() {
    this.errors = {};
    for (const message of MessageFormErrorMessages) {
      const control = this.messageForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}