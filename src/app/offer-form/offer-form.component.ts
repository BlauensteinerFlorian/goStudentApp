import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder, FormGroup, FormArray, Validators, FormControl
} from "@angular/forms";
import { OfferFormErrorMessages } from "./offer-form-error-messages";
import { OfferFactory } from "../shared/offer-factory";
import { OfferService } from "../shared/offer.service";
import { Offer } from "../shared/offer";
import { AuthenticationService } from "../shared/authentication.service";
import { UserService } from "../shared/user.service";
import { User } from "../shared/user";
import { UserFactory } from "../shared/user-factory";
import { SubjectService } from "../shared/subject.service";
import { Subject } from "../shared/subject";
import { delay } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'gs-offer-form',
  templateUrl: './offer-form.component.html',
  styles: [
  ]
})
export class OfferFormComponent implements OnInit {

  offerForm: FormGroup;
  offer = OfferFactory.empty();
  user = UserFactory.empty();
  subjects: Subject[] = [];
  errors: { [key: string]: string } = {};
  isUpdatingOffer = false;
  images: FormArray;
  count: number = 0;
  constructor(
    private fb: FormBuilder,
    private os: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private subjectService: SubjectService,
    private toastr: ToastrService
  ) {
    this.offerForm = this.fb.group({});
    this.images = this.fb.array([]);
  }
  ngOnInit() {
    this.subjectService.getAll().subscribe(subjects => {
      this.subjects = subjects
      const id = this.route.snapshot.params["id"];
      if (id) {
        this.isUpdatingOffer = true;
        //TODO get tutor of offer and get subject of offer
        this.os.getSingle(id).subscribe(offer => {
          this.offer = offer;
          this.initOffer();
        });
      }
    });
    this.userService.getSingle(this.authService.getCurrentUserId().toString()).subscribe(user => this.user = user);
    this.initOffer();
  }
  initOffer() {
    this.count++;
    this.offerForm = this.fb.group({
      id: this.offer.id,
      title: [this.offer.title, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      state: [this.offer.state, Validators.required],
      start_time: [this.offer.start_time, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      end_time: [this.offer.end_time, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      description: this.offer.description,
      date: [this.offer.date, Validators.required],
      subject_id: [this.offer.subject_id, Validators.required]
    });
    this.offerForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }
  submitForm() {
    const offer: Offer = OfferFactory.fromObject(this.offerForm.value);
    offer.date = this.formatDate(offer.date);
    if (this.isUpdatingOffer) {
      this.os.update(offer).subscribe(res => {
        this.router.navigate(["../../offers", offer.id], {
          relativeTo: this.route
        });
        this.toastr.success("Nachhilfeangebot erfolgreich bearbeitet.", "Bearbeitet");
      });
    } else {
      offer.user = this.user;
      offer.user_id = this.user.id;

      this.os.create(offer).subscribe(res => {
        this.offer = OfferFactory.empty();
        this.offerForm.reset(OfferFactory.empty());
        this.router.navigate(["../offers"], { relativeTo: this.route });
        this.toastr.success("Nachhilfeangebot erfolgreich erstellt.", "Erstellt");
      });
    }
  }
  updateErrorMessages() {
    this.errors = {};
    for (const message of OfferFormErrorMessages) {
      const control = this.offerForm.get(message.forControl);
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
  formatDate(input: string): string {
    let date = new Date(input).toLocaleDateString("de-DE");
    let dateArray = date.split(".").reverse();
    date = dateArray[0] + "-" + (Number(dateArray[1]) < 10 ? ("0" + dateArray[1]) : dateArray[1]) + "-" +
      (Number(dateArray[2]) < 10 ? ("0" + dateArray[2]) : dateArray[2])
    return date;
  }

}