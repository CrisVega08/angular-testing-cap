import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dev } from 'src/app/models/devs';

@Component({
  selector: 'app-card-dev',
  templateUrl: './card-dev.component.html',
  styleUrls: ['./card-dev.component.scss'],
})
export class CardDevComponent {
  @Input() dev!: Dev;
  @Output() selected = new EventEmitter<Dev>();

  click() {
    this.selected.emit(this.dev);
  }
}
