import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferListItemComponent } from './offer-list-item/offer-list-item.component';
import { OfferService } from './shared/offer.service';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { JwtInterceptorService } from './shared/jwt-interceptor.service';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectListItemComponent } from './subject-list-item/subject-list-item.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferListComponent,
    OfferListItemComponent,
    OfferDetailsComponent,
    HomeComponent,
    LoginComponent,
    OfferFormComponent,
    SubjectListComponent,
    SubjectListItemComponent,
    SubjectDetailsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot(), ReactiveFormsModule
  ],
  providers: [OfferService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
