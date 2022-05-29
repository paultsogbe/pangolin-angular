import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { PangolinService } from '../pangolin.service';

@Component({
  selector: 'app-pangolin-create',
  templateUrl: './pangolin-create.component.html',
  styleUrls: ['./pangolin-create.component.css'],
})
export class PangolinCreateComponent implements OnInit {
  creationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pangolinService: PangolinService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.creationForm = this.fb.group({
      title: '',
      role: '',
      content: '',
      image: '',
    });
  }

  upload() {
    //retrieve file upload HTML tag
    let inputEl: HTMLInputElement =
      this.el.nativeElement.querySelector('#image');
    let fileCount: number = inputEl.files!.length;
    let formData = new FormData();
    // make sure a file was selected.
    if (fileCount > 0) {
      //append the key name 'image' with the first file in the element
      let myImage = inputEl.files!.item(0);
      formData.append('image', 'myImage');
      this.pangolinService.uploadImage(formData).subscribe(
        (data) => console.log(data),
        (error) => console.error(error)
      );
    }
  }

  createPangolin(formDirective: FormGroupDirective) {
    if (this.creationForm.valid) {
      console.log(this.creationForm);
      this.pangolinService.createPangolin(this.creationForm.value).subscribe(
        (data) => this.handleSuccess(data, formDirective),
        (error) => this.handleError(error)
      );
    }
  }

  handleSuccess(data, formDirective) {
    console.log('OK handleSuccess - pangolin created', data);
    this.creationForm.reset();
    formDirective.resetForm();
    this.pangolinService.dispatchPangolinCreated(data._id);
  }

  handleError(error) {
    console.log('KO handleError - pangolin post NOT created', error);
  }
}
