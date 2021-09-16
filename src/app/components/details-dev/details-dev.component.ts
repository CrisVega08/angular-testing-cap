import { Component, EventEmitter, Input, Output } from '@angular/core';
import { empty } from 'rxjs';
import { Dev } from 'src/app/models/devs';

@Component({
  selector: 'app-details-dev',
  templateUrl: './details-dev.component.html',
  styleUrls: ['./details-dev.component.scss'],
})
export class DetailsDevComponent {
  bkpDev!: Dev;
  showInfo = false;
  secondClick = false;

  @Input() set dev(values: Dev) {
    this.bkpDev = JSON.parse(JSON.stringify(values));
    if (values && !!values.info.name) {
      this.showInfo = true;
    }
  }

  @Output() clearDev = new EventEmitter<void>();

  close() {
    if (!this.secondClick) {
      this.secondClick = true;
    } else if (this.secondClick) {
      this.showInfo = false;
      this.bkpDev.info.name = '';
      this.secondClick = false;
      this.clearDev.emit();
    }
  }
}
