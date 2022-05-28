import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferDetailsComponent } from
    './offer-details/offer-details.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'offers', component: OfferListComponent },
    { path: 'offers/:id', component: OfferDetailsComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }