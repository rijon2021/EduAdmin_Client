import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';

@Component({
  selector: 'app-subject-choice',
  templateUrl: './subject-choice.component.html',
  styleUrls: ['./subject-choice.component.scss']
})
export class SubjectChoiceComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private swal: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  async save() {
    if (await this.swal.confirm_custom('সতর্কীকরণ ! <br> একবার সাবমিট করার পর পরবর্তীতে বিষয় পরিবর্তনের সুযোগ থাকবে না  ', SweetAlertEnum.warning, true, false)) {
      this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
    }
  }
}
