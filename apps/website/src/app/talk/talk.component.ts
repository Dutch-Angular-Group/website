import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IdleMonitorService,
  ScullyRoutesService,
  TransferStateService,
} from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Meetup {
  meta: Meta;
  data: Data;
}

export interface Data {
  created: number;
  duration: number;
  id: string;
  name: string;
  date_in_series_pattern: boolean;
  status: string;
  time: number;
  local_date: Date;
  local_time: string;
  updated: number;
  utc_offset: number;
  waitlist_count: number;
  yes_rsvp_count: number;
  venue: Venue;
  is_online_event: boolean;
  group: Group;
  link: string;
  description: string;
  how_to_find_us: string;
  visibility: string;
  member_pay_fee: boolean;
}

export interface Group {
  created: number;
  name: string;
  id: number;
  join_mode: string;
  lat: number;
  lon: number;
  urlname: string;
  who: string;
  localized_location: string;
  state: string;
  country: string;
  region: string;
  timezone: string;
}

export interface Venue {
  id: number;
  name: string;
  repinned: boolean;
  country: string;
  localized_country_name: string;
}

// tslint:disable-next-line: no-empty-interface
export interface Meta {}

@Component({
  selector: 'dutch-angular-group-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
})
export class TalkComponent implements OnInit {
  vm$: Observable<any>;
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly httpClient: HttpClient,
    private idle: IdleMonitorService,
    public scully: ScullyRoutesService,
    private transferState: TransferStateService
  ) {
    this.vm$ = this.transferState.useScullyTransferState(
      'event',
      this.activeRoute.params.pipe(
        switchMap(({ talkid }) =>
          this.httpClient.jsonp<Meetup>(
            `https://api.meetup.com/Dutch-Angular-Group/events/${talkid}`,
            'callback'
          )
        )
      )
    );
  }

  ngOnInit(): void {}
}
