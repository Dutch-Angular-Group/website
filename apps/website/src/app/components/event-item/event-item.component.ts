import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dutch-angular-group-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {
  public _status = 'white';
  @Input() time: string;
  @Input() date: string;
  @Input() title: string;
  @Input() online: boolean;
  @Input() attendees: string;
  @Input() link: string;
  @Input()
  public set status(v: 'upcoming' | 'past') {
    if (v === 'past') {
      this._status = 'gray';
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
