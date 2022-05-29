import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Pangolin } from '../models/pangolin';

import { PangolinService } from '../pangolin.service';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-pangolin-edit',
  templateUrl: './pangolin-edit.component.html',
  styleUrls: ['./pangolin-edit.component.css'],
})
export class PangolinEditComponent implements OnInit {
  pangolinId!: string | null;
  pangolin!: Pangolin;

  constructor(
    private fb: FormBuilder,
    private pangolinService: PangolinService,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pangolinId = this.activatedRoute.snapshot.paramMap.get('id');
    this.pangolinService.getPangolinById(this.pangolinId!).subscribe(
      (data) => {
        this.pangolin = data;
      },
      (error) => console.error(error)
    );
  }

  upload() {
    //retrieve file upload HTML tag
    let inputEl: HTMLInputElement =
      this.el.nativeElement.querySelector('#image');
    let fileCount: number = inputEl.files!.length;
    let formData = new FormData();
    // make sure a file was selected.
    if (fileCount > 0) {
      let myImage = inputEl.files!.item(0);
      //append the key name 'image' with the first file in the element
      formData.append('image', 'myImage');
      this.pangolinService.uploadImage(formData).subscribe(
        (data) => console.log(data),
        (error) => console.error(error)
      );
    }
  }

  updatePangolin(formDirective: FormGroupDirective) {
    console.log(this.pangolin);
    const editedPangolin = this.pangolin;
    this.pangolinService
      .updatePangolin(this.pangolinId!, editedPangolin)
      .subscribe(
        (data) => this.handleSuccess(data, formDirective),
        (error) => this.handleError(error)
      );
  }

  handleSuccess(data, formDirective) {
    console.log('OK handleSuccess - pangolin updated', data);
    formDirective.reset();
    formDirective.resetForm();
    this.pangolinService.dispatchPangolinCreated(data._id);
  }

  handleError(error) {
    console.log('KO handleError - pangolin NOT updated', error);
  }
}
