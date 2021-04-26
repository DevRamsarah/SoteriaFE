import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  @Input() number: string;
  @Input() subtitle: string;
  @Input() sub: string;
  constructor() { }

  ngOnInit(): void {
  }

}
