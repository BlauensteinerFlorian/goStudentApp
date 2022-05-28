import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { Offer } from './offer';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  offers: Offer[];
  subject: Subject;
  user: User;

  constructor() {
    this.subject = new Subject(1, "Mathe", "mathematikunterricht");
    this.user = new User(1, "florian", "blauensteiner", "test", "test@test.test", 2, "biography", "+436645273827");
    this.offers = [
      new Offer(1, "offer1", "12:00", "14:00", new Date(), this.user, this.subject, "open", "ich biete nachhilfeunterricht für in mathematik")
    ];
  }

  getAll() {
    return this.offers;
  }
}
