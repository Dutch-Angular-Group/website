import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dutch-angular-group-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
  @Input() light = true;
  @Input() big = true;
  @Input() center = false;

  constructor() {}

  ngOnInit(): void {}
}
