import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dutch-angular-group-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  checkLink(link) {
    return location.pathname.includes(link);
  }
}
