import { Component, OnInit } from '@angular/core';
import { Subject } from '../shared/subject';
import { SubjectService } from '../shared/subject.service';

@Component({
  selector: 'gs-subject-list',
  templateUrl: './subject-list.component.html',
  styles: [
  ]
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService) {

  }

  ngOnInit(): void {
    this.subjectService.getAll().subscribe(res => {
      this.subjects = res
    });
  }

}
