// import { Component } from "@angular/core";
// import { fakeAsync, TestBed, tick } from "@angular/core/testing";
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router, Routes } from "@angular/router";
// import { Location } from "@angular/common";

// @Component({
//   template: `Home`
// })
// export class HomeComponent {}

// @Component({
//   template: `About`
// })
// export class AboutComponent {}

// @Component({
//   template: `<router-outlet></router-outlet>`
// })
// export class AppComponent {}

// export const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full'},
//   { path: 'home', component: HomeComponent },
//   { path: 'about', component: AboutComponent }
// ]

// describe('', () => {
//   let location: Location;
//   let router: Router;
//   let fixture;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule.withRoutes(routes)],
//       declarations: [AppComponent, HomeComponent, AboutComponent]
//     })
//     router = TestBed.inject(Router);
//     location = TestBed.inject(Location);

//     fixture = TestBed.createComponent(AppComponent);
//   })

//   it('should render to devs page', () => {
//     router.initialNavigation();
//     expect(location.path()).toBe('')
//   })

//   it('should rediret to about page', fakeAsync(() => {
//     router.initialNavigation();
//     router.navigate(['about']);
//     tick();
//     expect(location.path()).toBe('/about');
//   }))
// })

// ==================================================================================
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { routes, AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/auth.guard';

interface ICustomProvide {
  [key: string]: any;
}
class MockAuthService {
  isLogged = false;
  canActivate() {
    return this.isLogged;
  }
}
function setup(providers: ICustomProvide[] = []) {
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers,
  }).overrideModule(AppModule, {
    remove: { imports: [AppRoutingModule] },
    add: { imports: [RouterTestingModule.withRoutes(routes)] },
  });
  const router = TestBed.inject(Router);
  const location = TestBed.inject(Location);

  TestBed.createComponent(AppComponent);

  return { router, location };
}

fdescribe('', () => {
  it('should render to devs page', () => {
    const { router, location } = setup();
    router.initialNavigation();
    expect(location.path()).toBe('');
  });

  it('should rediret to about page', fakeAsync(() => {
    const { router, location } = setup();
    router.initialNavigation();
    router.navigate(['about']);
    tick();
    expect(location.path()).toBe('/about');
  }));

  it('should avoid redirect to about page', fakeAsync(() => {
    const { router, location } = setup([
      {
        provide: AuthGuard,
        useClass: MockAuthService,
      },
    ]);
    router.initialNavigation();
    router.navigate(['about']);
    tick();
    expect(location.path()).toBe('/');
  }));
});
