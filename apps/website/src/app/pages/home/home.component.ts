import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';
const regex = RegExp('/talks/[0-9]*');
const today = new Date();
@Component({
  selector: 'dutch-angular-group-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  routesFuture: ScullyRoute[];
  routesPast: ScullyRoute[];
  constructor(public scully: ScullyRoutesService) {
    this.scully.allRoutes$
      .pipe(map((routes) => routes.filter((route) => regex.test(route.route))))
      .subscribe((routes) => {
        this.routesFuture = routes.filter(
          (route) => route.status === 'upcoming'
        );
      });
  }

  ngOnInit(): void {}
}
