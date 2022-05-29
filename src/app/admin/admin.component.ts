import { Component, OnInit } from '@angular/core';
import { Pangolin } from '../models/pangolin';
import { Observable } from 'rxjs';
import { PangolinService } from '../pangolin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  // blogs!: Observable<Blogpost[]>;
  allPangolins!: Pangolin[];
  pangolins!: Observable<Pangolin[]>;
  errorFromServer = '';

  constructor(private pangolinService: PangolinService) {}

  ngOnInit(): void {
    // this.blogs! = this.blogpostService.getBlogposts();
    this.pangolinService.getPangolins().subscribe((data) => {
      console.log(data);
      this.allPangolins = data;
      this.pangolinService.handlePangolinCreated().subscribe((data) => {
        console.log('Admin componenet recieved', data);
        this.refresh(data);
      });
    });
  }

  deletePangolins(selectedOptions) {
    const ids = selectedOptions.map((so) => so.value);
    this.pangolinService.deleteSinglePangolin(ids[0]).subscribe(
      (data) => this.refresh(data),
      (err) => this.handleError(err)
    );
  }

  refresh(data) {
    console.log('data', data);
    this.pangolinService.getPangolins().subscribe((data) => {
      this.allPangolins = data;
    });
  }

  handleError(error) {
    console.error(error);
  }
}
