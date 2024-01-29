import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { ElectedSubject } from 'src/app/core/models/edu/electedSubject';
import { MandantorySubject } from 'src/app/core/models/edu/mandantorySubject';
import { OptionalSubject } from 'src/app/core/models/edu/optionalSubject';
import { SubjectChoice } from 'src/app/core/models/edu/subjectChoice';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { SubjectService } from 'src/app/core/services/edu/subject.service';

@Component({
  selector: 'app-subject-choice',
  templateUrl: './subject-choice.component.html',
  styleUrls: ['./subject-choice.component.scss']
})
export class SubjectChoiceComponent implements OnInit {

  selectedSubject: SubjectChoice = new SubjectChoice();
  objSubject: ElectedSubject = new ElectedSubject();
  lstElectedSubject: any;
  lstMandetorySubject: MandantorySubject[] = new Array<MandantorySubject>();
  lstOptionalSubject: OptionalSubject[] = new Array<OptionalSubject>();
  queryObject: QueryObject = new QueryObject();
  lstSelectedMandatorySubject = [];
  testAPIList:any;
  studentId: number;
  subjectStatus: string;

  constructor(
    private route: ActivatedRoute,
    private swal: SweetAlertService,
    private router: Router,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.studentId = parseInt(localStorage.getItem(LOCALSTORAGE_KEY.STUDENT_ID));
    this.getAllSubjects();
    this.getAllMandetorySubjects();
    this.getAllMandetoryOptional();
    // this.getTestapi();
  }

  // getTestapi() {
  //   this.subjectService.testAPI().subscribe(
  //     (res) => {
  //       if (res) {
  //         this.testAPIList = res;
  //       }
  //     }
  //   )
  // }
  getAllSubjects() {
    this.subjectService.getAllElectedSubjects(this.studentId).subscribe(
      (res: ElectedSubject) => {
        if (res) {
          this.subjectStatus = res.subjectStatus;
          this.lstElectedSubject =  res.subjects;
        }
      }
    )
  }
  getAllMandetorySubjects() {
    this.subjectService.getAllMandetorySubject(this.studentId).subscribe(
      (res: MandantorySubject) => {
        if (res) {
          this.lstMandetorySubject = Object.assign(this.lstMandetorySubject, res);
        }
      }
    )
  }
  getAllMandetoryOptional() {

    this.subjectService.getAllMandetoryOptional(this.studentId).subscribe(
      (res: OptionalSubject) => {
        if (res) {
          this.lstOptionalSubject = Object.assign(this.lstOptionalSubject, res);
        }
      }
    )
  }
  changeMandatorySubject(event: any, Id) {
    if (event) {
      this.lstSelectedMandatorySubject.push(Id);
    }

  }

  async save() {
    if (await this.swal.confirm_custom('সতর্কীকরণ ! <br> একবার সাবমিট করার পর পরবর্তীতে বিষয় পরিবর্তনের সুযোগ থাকবে না  ', SweetAlertEnum.warning, true, false)) {
      this.selectedSubject.studentId = this.studentId;
      this.selectedSubject.mandatorySubjects = this.lstSelectedMandatorySubject;
      this.subjectService.save(this.selectedSubject).subscribe(
        (res: ElectedSubject) => {
          if (res) {
            this.swal.message('Data Save Successfully', SweetAlertEnum.success);
          } else {
            this.swal.message('Data Save Not Successfully', SweetAlertEnum.error);
          }
        }
      )
    }
  }
}
