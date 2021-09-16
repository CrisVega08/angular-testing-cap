import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Dev } from '../models/devs';
import { Observable } from 'rxjs';
import { DevsService } from './dev.service';

@Injectable({ providedIn: 'root' })
export class DevResolver implements Resolve<Dev> {
  constructor(private devsService: DevsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Dev> {
    return this.devsService.findDevById(route.params['id']);
  }
}
