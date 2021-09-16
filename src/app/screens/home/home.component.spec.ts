import {
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, of } from 'rxjs';
import { DevsService } from '../../services/dev.service';
import { ANGULAR_TEAM } from '../../data/data';

import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { Dev } from '../../models/devs';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const fakeDevService = {
  findAllDevs: jest.fn(),
};

function setup() {
  TestBed.configureTestingModule({
    imports: [HomeModule],
    providers: [
      {
        provide: DevsService,
        useValue: fakeDevService,
      },
    ],
  });
  const fixture = TestBed.createComponent(HomeComponent);
  const component = fixture.componentInstance;
  const element = fixture.debugElement;
  return { fixture, component, element };
}

describe('HomeComponent', () => {
  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  fit('should only display lead tabs', () => {
    const { fixture, element } = setup();
    const leads = ANGULAR_TEAM.filter((dev: Dev) => dev.category === 'Lead');
    fakeDevService.findAllDevs.mockReturnValueOnce(of(leads));
    fixture.detectChanges();
    const tabs = element.queryAll(By.css('.tab'));
    expect(tabs.length).toBe(1);
  });

  fit('should only display lead tabs', fakeAsync(() => {
    const { fixture, element } = setup();
    fakeDevService.findAllDevs.mockReturnValueOnce(of(ANGULAR_TEAM));
    fixture.detectChanges();
    const tabs = element.queryAll(By.css('.tab'));

    tabs[1].triggerEventHandler('click', { button: 0 });
    tick(500);
    fixture.detectChanges();
    // fixture.whenStable().then(() => {
    const cardTitles = element.queryAll(By.css('.card-title'));
    console.log(cardTitles[0].nativeElement);
    expect(cardTitles.length).toBeGreaterThan(0);
    expect(cardTitles[0].nativeElement.textContent).toContain(
      'Sebastian Rodriguez'
    );
    // });
  }));

  // fit('should only display lead tabs', fakeAsync(() => {
  //   const { fixture, element } = setup();
  //   fakeDevService.findAllDevs.mockReturnValueOnce(asyncData(ANGULAR_TEAM));
  //   fixture.detectChanges();
  //   fixture.detectChanges();
  //   flush();
  //   // fixture.whenStable().then(() => {
  //   const tabs = element.queryAll(By.css('.tab'));
  //   console.log(tabs);
  //   tabs[1].triggerEventHandler('click', { button: 0 });
  //   const cardTitles = element.queryAll(By.css('.card-title'));
  //   console.log(cardTitles[0].nativeElement);
  //   expect(cardTitles.length).toBeGreaterThan(0);
  //   expect(cardTitles[0].nativeElement.textContent).toContain(
  //     'Sebastian Rodriguez'
  //   );
  //   // });
  // }));
});
