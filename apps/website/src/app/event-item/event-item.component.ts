import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dutch-angular-group-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {
  public _color = 'red';
  @Input() time: string;
  @Input() date: string;
  @Input() title: string;
  @Input()
  public set color(v: 'red' | 'gray') {
    if (v) {
      this._color = v;
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
