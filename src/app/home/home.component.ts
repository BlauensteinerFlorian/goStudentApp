import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gs-home',
  template: `
<div class="ui container center aligned homeContainer">
<h1>Home</h1>
<p>Willkommen bei GoStudentKWM!</p>
<a routerLink="../offers" class="ui green button">
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
