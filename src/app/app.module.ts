import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferListItemComponent } from './offer-list-item/offer-list-item.component';
import { OfferService } from './shared/offer.service';

@NgModule({
  declarations: [
    AppComponent,
    OfferListComponent,
    OfferListItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [OfferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
