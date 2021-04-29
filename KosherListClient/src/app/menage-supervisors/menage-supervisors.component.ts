import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-menage-supervisors',
  templateUrl: './menage-supervisors.component.html',
  styleUrls: ['./menage-supervisors.component.css']
})
export class MenageSupervisorsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private Worker:Worker
  ) { }

  ngOnInit() {
  }

}
