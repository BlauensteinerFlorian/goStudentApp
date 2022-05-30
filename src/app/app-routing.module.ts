import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferDetailsComponent } from
    './offer-details/offer-details.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'offers', component: OfferListComponent },
    { path: 'offers/:id', component: OfferDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: OfferFormComponent },
    { path: 'admin/:id', component: OfferFormComponent },
    { path: 'subjects', component: SubjectListComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'subjects/:subjectid', component: SubjectDetailsComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }