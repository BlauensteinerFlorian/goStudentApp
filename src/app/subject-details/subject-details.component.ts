import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Subject } from '../shared/subject';
import { SubjectService } from '../shared/subject.service';

@Component({
  selector: 'gs-subject-details',
  templateUrl: './subject-details.component.html',
  styles: [
  ]
})
export class SubjectDetailsComponent implements OnInit {
  subject: Subject | undefined;

  constructor(private subjectService: SubjectService, private route: ActivatedRoute, private router: Router,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.subjectService.getSingle(params['subjectid']).subscribe(subject => {
      this.subject = subject;
      console.log(subject);
    });
  }

}