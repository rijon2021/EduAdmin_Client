import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { MandantorySubject, OptionalSubject, SubjectChoice } from 'src/app/core/models/edu/subjectChoice';
import { SubjectService } from 'src/app/core/services/edu/subject.service';

@Component({
  selector: 'app-subject-choice',
  templateUrl: './subject-choice.component.html',
  styleUrls: ['./subject-choice.component.scss']
})
export class SubjectChoiceComponent implements OnInit {

  selectedSubject: SubjectChoice = new SubjectChoice();
  lstMandetorySubject: MandantorySubject[] = new Array<MandantorySubject>();
  lstOptionalSubject: OptionalSubject[] = new Array<OptionalSubject>();
  queryObject: QueryObject = new QueryObject(); 
  lstSelectedMandatorySubject =[];

  constructor(
    private route: ActivatedRoute,
    private swal: SweetAlertService,
    private router: Router,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    
    this.getAllMandetorySubjects();
    this.getAllMandetoryOptional();
  }


  getAllMandetorySubjects() {
    this.subjectService.getAllMandetorySubject(this.queryObject.ClassId, this.queryObject.GroupId).subscribe(
      (res:MandantorySubject) => {
        if (res) {
          this.lstMandetorySubject = Object.assign(this.lstMandetorySubject, res);
        }
      }
    )
  }
  getAllMandetoryOptional() {
    
    this.subjectService.getAllMandetoryOptional(this.queryObject.ClassId, this.queryObject.GroupId).subscribe(
      (res:OptionalSubject) => {
        if (res) {
          this.lstOptionalSubject = Object.assign(this.lstOptionalSubject, res);
        }
      }
    )
  }
  changeMandatorySubject(){
    console.log(this.lstMandetorySubject)
    this.lstSelectedMandatorySubject.push(this.selectedSubject.mandantorySubject.subjeceId)
  }

  async save() {
    if (await this.swal.confirm_custom('সতর্কীকরণ ! <br> একবার সাবমিট করার পর পরবর্তীতে বিষয় পরিবর্তনের সুযোগ থাকবে না  ', SweetAlertEnum.warning, true, false)) {
      this.subjectService.save(this.selectedSubject).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
          }
        }
      )
    }
  }
}
