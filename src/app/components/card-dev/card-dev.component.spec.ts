// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CardDevComponent } from './card-dev.component';

// describe('CardDevComponent', () => {
//   let component: CardDevComponent;
//   let fixture: ComponentFixture<CardDevComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ CardDevComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CardDevComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { Dev } from 'src/app/models/devs';
import { CardDevComponent } from './card-dev.component';

describe('CardDevComponent', () => {
  it('should create component', () => {
    const component = new CardDevComponent();
    expect(component).toBeTruthy();
  });

  it('should render properties correctly', () => {
    const component = new CardDevComponent();
    expect(component.dev).toBeUndefined();

    const dev: Dev = { id: 42, category: 'dev', info: { name: 'Cristian' } };
    component.dev = dev;
    component.selected
      .pipe(first())
      .subscribe((selectedHero: Dev) => expect(selectedHero).toBe(dev));

    component.click();
  });

  it('should render title', () => {
    TestBed.configureTestingModule({ declarations: [CardDevComponent] });
    const fixture = TestBed.createComponent(CardDevComponent);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    const dev: Dev = { id: 42, category: 'dev', info: { name: 'Cristian' } };
    component.dev = dev;
    fixture.detectChanges();
    const title = debugElement.nativeElement.querySelector('.card-title');
    expect(title.textContent).toBe(dev.info.name);
  });
});
