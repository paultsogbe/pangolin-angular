import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pangolin } from '../models/pangolin';
import { PangolinService } from '../pangolin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pangolin-list',
  templateUrl: './pangolin-list.component.html',
  styleUrls: ['./pangolin-list.component.css'],
})
export class PangolinListComponent implements OnInit {
  pangolinPostList!: Observable<Pangolin[]>;
  imagePath = environment.imagePath;
  imagesFolder = 'https://pangolin-api-paul.herokuapp.com/';
  pangolinList: any;

  constructor(private pangolinService: PangolinService) {}

  ngOnInit() {
    this.pangolinList! = this.pangolinService.getPangolins();
  }
}
