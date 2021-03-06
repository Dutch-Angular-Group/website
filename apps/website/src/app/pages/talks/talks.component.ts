import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const regex = RegExp('/talks/[0-9]*');
const today = new Date();
@Component({
  selector: 'dutch-angular-group-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.scss'],
})
export class TalksComponent implements OnInit {
  talks$: Observable<any>;
  constructor(public scully: ScullyRoutesService) {
    this.talks$ = this.scully.allRoutes$.pipe(
      map((routes) => routes.filter((route) => regex.test(route.route)))
    );
  }

  ngOnInit(): void {}
}
