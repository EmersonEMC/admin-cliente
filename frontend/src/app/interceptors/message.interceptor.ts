import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { AuthService } from '../shared/services/auth.service';
import { LoaderService } from '../shared/services/loader.service';

interface IHttpErros {
  status: string;
  statusCode: number;
  message: string;
}

@Injectable()
export class MessageInterceptor implements HttpInterceptor {
  timeout = 100;

  private lastNotify = 0;
  private dateToMilliseconds = 5000;
  private UNAUTHORIZED = 401;

  private readonly ignorePath = ['logout', 'auth/web'];

  constructor(
    private notify: NotifierService,
    private readonly authServ: AuthService,
    public loaderService: LoaderService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const checkIncludesPath = (path: string) => request.url.includes(path);
    const notIncluesPaths = this.ignorePath.every(
      (path) => !checkIncludesPath(path),
    );

    if (notIncluesPaths) {
      this.showLoader();
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<unknown>) => {
        this.mapRequest(event);
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return this.checkError(request, error);
      }),
      finalize(() => this.hideLoader()),
    );
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  private checkError(
    request: HttpRequest<unknown>,
    error: HttpErrorResponse,
  ): Observable<never> {
    let errorObj: IHttpErros = {} as IHttpErros;

    if (_.isEmpty(error.error)) {
      errorObj.status = error.statusText;
      errorObj.statusCode = error.status;
      errorObj.message = error.message;
    } else {
      errorObj = error.error as IHttpErros;
    }

    if (error.status === this.UNAUTHORIZED) {
      if (request.url.includes('auth/web')) {
        this.warning(errorObj.message);
      } else {
        this.warning(errorObj.message);
        this.authServ.cleanUserStorage();
        setTimeout(() => {
          this.router.navigate(['/login']).catch(() => {
            console.error(
              'VRMonitor MessageInterceptor - Router navigation error.',
            );
          });
        }, this.timeout);
      }
    } else if (this.checkLastAlert()) {
      this.updateLastNotify();
      if (error.status >= 400 && error.status <= 499) {
        this.warning(errorObj.message);
      } else {
        this.danger(errorObj.message);
      }
    }

    return throwError(errorObj);
  }

  private warning(message: string) {
    this.notify.notify('warning', message);
  }

  private danger(message: string) {
    this.notify.notify('error', message);
  }

  private success(message: string) {
    this.notify.notify('success', message);
  }

  private checkLastAlert(): boolean {
    return this.lastNotify < this.dateTimeNow();
  }

  private updateLastNotify(): void {
    this.lastNotify = this.dateTimeNowAddMilliseconds(this.dateToMilliseconds);
  }

  private dateTimeNowAddMilliseconds(milliseconds: number): number {
    return new Date(this.dateTimeNow() + milliseconds).getTime();
  }

  private dateTimeNow(): number {
    return new Date().getTime();
  }

  private mapRequest(event: HttpEvent<unknown>): void {
    const ev = event as { body: { message: string } };
    this.checkAndShowMessageSuccess(ev.body);
  }

  private checkAndShowMessageSuccess(body: { message: string }): void {
    if (body?.message) {
      this.success(body.message);
    }
  }
}

export const MESSAGE_INTERCEPTORPROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: MessageInterceptor,
  multi: true,
};
