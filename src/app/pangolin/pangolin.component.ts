import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../pangolin.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Pangolin } from '../models/pangolin';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pangolin',
  templateUrl: './pangolin.component.html',
  styleUrls: ['./pangolin.component.css'],
})
export class PangolinComponent implements OnInit {
  pangolin!: Observable<Pangolin>;
  imagePath = environment.imagePath;
  constructor(
    private activatedRoute: ActivatedRoute,
    private pangolinService: PangolinService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pangolin! = this.pangolinService.getPangolinById(id!);
  }
}
