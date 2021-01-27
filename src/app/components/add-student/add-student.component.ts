import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

import { ApiService } from '../../shared/api.service';
import { Route } from '@angular/compiler/src/core';


export interface Subject { name: string; }

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList') chipList: any;
  @ViewChild('resetStudentForm') myNgForm: any;
  
  readonly separatorKeysCode: number[] = [ENTER, COMMA];
  studentForm: FormGroup;
  subjectArray: Subject[] = [];
  SectionInArray: any = ['A', 'B', 'C', 'D', 'E'];


  ngOnInit() { this.submitBookForm }

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private studentApi: ApiService) { }

  submitBookForm() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subjects: [this.subjectArray],
      dob: ['', [Validators.required]],
      gender: ['Male']//por defecto.
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() });
    }
    if (input) { input.value = ''; }
  }

  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }

  /*formatDate(e: Event): void {
    let parseDate = new Date(e.target.value).toISOString().substring(0 ,10);
    this.studentForm.get('dob')?.setValue(parseDate, { onlySelf: true });
  }*/

  public handleError = (controlName: string, errorName: string) => this.studentForm.controls[controlName].hasError(errorName);

  submitStudentForm() {
    if (this.studentForm.valid) {
      this.studentApi.AddStudent(this.studentApi.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
      });
    }
  }
}
