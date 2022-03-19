import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthService } from '../shared/services/auth.service';
import { LoaderService } from '../shared/services/loader.service';
import { NotifyService } from '../shared/services/notify.service';
import { MessageInterceptor } from './message.interceptor';

@Injectable()
class FakeLoaderService extends LoaderService {
  show(): void {
    /** */
  }

  hide(): void {
    /** */
  }
}
@Injectable()
class FakeNotifyService extends NotifyService {
  danger(param = 'Internal Server Error!'): void {
    /** */
  }

  success(param = 'Sucesso!'): void {
    /** */
  }

  warning(param = 'Warning!'): void {
    /** */
  }

  info(param = 'Info!'): void {
    /** */
  }
}
@Injectable()
class FakeAuthService extends AuthService {
  cleanUserStorage(): void {
    /** */
  }
}

describe('MessageInterceptor', () => {
  let interceptor: MessageInterceptor;
  const routerSpy = {
    navigate: () => ({ catch: () => jasmine.createSpy }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MessageInterceptor,
        { provide: LoaderService, useClass: FakeLoaderService },
        { provide: AuthService, useClass: FakeAuthService },
        { provide: NotifyService, useClass: FakeNotifyService },
        { provide: Router, useValue: routerSpy },
      ],
    });
    interceptor = TestBed.inject(MessageInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('intercept messages', async () => {
    let request = new HttpRequest('GET', environment.baseUrl);
    const payload: any = {
      body: {
        message: 'Sucesso',
        data: null,
      },
      statusText: 'Sucesso',
      status: 200,
    };
    const response = new HttpResponse(payload);
    const next = {
      handle: jasmine.createSpy('handle').and.callFake(() => of(response)),
    };

    interceptor
      .intercept(request, next)
      .pipe(take(1))
      .subscribe((resp: any) => {
        expect(resp).toBeDefined();
        expect(resp.body.message).toEqual('Sucesso');
        expect(resp.status).toEqual(200);
      });
  });

  it('intercept Error messages 401', async () => {
    let request = new HttpRequest('GET', environment.baseUrl);
    const payload: any = {
      error: 'Unauthorized',
      body: {
        message: 'Unauthorized',
        data: null,
      },
      statusText: 'Unauthorized',
      status: 401,
      url: environment.baseUrl,
    };
    const response = new HttpErrorResponse(payload);
    const next = {
      handle: jasmine
        .createSpy('handle')
        .and.callFake(() => throwError(response)),
    };

    interceptor
      .intercept(request, next)
      .pipe(take(1))
      .subscribe(
        (resp: any) => {
          /** */
        },
        (error) => {
          expect(error).toEqual('Unauthorized');
        },
      );
  });

  it('intercept Error messages checkError 401', async () => {
    let request = new HttpRequest('GET', `${environment.baseUrl}auth/web`);
    const payload: any = {
      error: null,
      body: {
        message: 'Unauthorized',
        data: null,
      },
      statusText: 'Unauthorized',
      status: 401,
      url: environment.baseUrl,
    };
    const response = new HttpErrorResponse(payload);
    const next = {
      handle: jasmine
        .createSpy('handle')
        .and.callFake(() => throwError(response)),
    };

    interceptor
      .intercept(request, next)
      .pipe(take(1))
      .subscribe(
        (resp: any) => {
          /** */
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error.status).toEqual('Unauthorized');
          expect(error.statusCode).toEqual(401);
        },
      );
  });

  it('intercept Error messages checkError 500', () => {
    let request = new HttpRequest('GET', `${environment.baseUrl}auth/web`);
    const payload: any = {
      error: null,
      body: {
        message: 'Internal Server Error',
        data: null,
      },
      statusText: 'Internal Server Error',
      status: 500,
      url: environment.baseUrl,
    };
    const response = new HttpErrorResponse(payload);
    const next = {
      handle: jasmine
        .createSpy('handle')
        .and.callFake(() => throwError(response)),
    };

    interceptor
      .intercept(request, next)
      .pipe(take(1))
      .subscribe(
        (resp: any) => {
          /** */
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error.status).toEqual('Internal Server Error');
          expect(error.statusCode).toEqual(500);
        },
      );
  });
  it('intercept Error messages checkError 400', () => {
    let request = new HttpRequest('GET', `${environment.baseUrl}auth/web`);
    const payload: any = {
      error: null,
      body: {
        message: 'Bad Request',
        data: null,
      },
      statusText: 'Bad Request',
      status: 400,
      url: environment.baseUrl,
    };
    const response = new HttpErrorResponse(payload);
    const next = {
      handle: jasmine
        .createSpy('handle')
        .and.callFake(() => throwError(response)),
    };

    interceptor
      .intercept(request, next)
      .pipe(take(1))
      .subscribe(
        (resp: any) => {
          /** */
        },
        (error) => {
          expect(error).toBeDefined();
          expect(error.status).toEqual('Bad Request');
          expect(error.statusCode).toEqual(400);
        },
      );
  });
});
