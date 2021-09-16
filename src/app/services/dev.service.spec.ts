import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DevsService } from './dev.service';
import { ANGULAR_TEAM } from '../data/data';
import { of } from 'rxjs';

const fakeHttpClient = {
  get: jest.fn(),
  put: jest.fn(),
};

describe('DevService', () => {
  let service: DevsService;
  let httpTestingController: HttpTestingController;
  // beforeEach(() => {
  //   service = new DevsService(fakeHttpClient as any)
  // })
  // it('should get devs info', (done) => {
  //   fakeHttpClient.get.mockReturnValue(of({ payload: ANGULAR_TEAM }))
  //   service.findAllDevs().subscribe(
  //     (devs) => {
  //       expect(devs).toEqual(ANGULAR_TEAM);
  //       done();
  //     },
  //     done.fail
  //   );
  //   expect(fakeHttpClient.get).toHaveBeenCalledTimes(1);
  // })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DevsService],
    });
    service = TestBed.inject(DevsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Should return all devs', (done) => {
    service.findAllDevs().subscribe((devs) => {
      expect(devs).toEqual(ANGULAR_TEAM);
      done();
    }, done.fail);
    const req = httpTestingController.expectOne('api/devs');
    expect(req.request.method).toEqual('GET');
    req.flush(ANGULAR_TEAM);
  });

  it('Should return dev with specific Id', (done) => {
    const dev = ANGULAR_TEAM[0];
    service.findDevById(dev.id).subscribe((selectedDev) => {
      expect(selectedDev).toEqual(dev);
      done();
    }, done.fail);
    const req = httpTestingController.expectOne(`api/devs/${dev.id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(dev);
  });

  it('should update dev', (done) => {
    const dev = ANGULAR_TEAM[0];
    dev.info.name = 'Cristian Francisco Vega Herrera';
    service.saveDev(dev.id, dev).subscribe((updatedDev) => {
      expect(updatedDev).toEqual(dev);
      done();
    }, done.fail);
    const req = httpTestingController.expectOne(`api/devs/${dev.id}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.info.name).toEqual(dev.info.name);

    req.flush(dev);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
