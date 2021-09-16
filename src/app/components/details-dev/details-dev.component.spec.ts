import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesModule } from '../../directives/directives.module';

import { DetailsDevComponent } from './details-dev.component';

describe('DetailsDevComponent', () => {
  let component: DetailsDevComponent;
  let fixture: ComponentFixture<DetailsDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsDevComponent],
      imports: [DirectivesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
