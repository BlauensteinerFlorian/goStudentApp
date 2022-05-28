import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gs-home',
  template: `
<div class="ui container">
<h1>Home</h1>
<p>Willkommen bei GoStudentKWM!</p>
<a routerLink="../offers" class="ui red button">
Nachhilfeangebote ansehen
</a>
</div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
