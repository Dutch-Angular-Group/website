import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
const regex = RegExp('/talks/[0-9]*');

@Component({
  selector: 'dutch-angular-group-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css'],
})
export class TalksComponent implements OnInit {
  routes$: Observable<ScullyRoute[]>;
  constructor(public scully: ScullyRoutesService) {
    this.routes$ = this.scully.allRoutes$.pipe(
      map((routes) => routes.filter((route) => regex.test(route.route)))
    );
  }

  ngOnInit(): void {}
}
