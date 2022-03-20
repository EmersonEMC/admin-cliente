import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  domain: string;

  constructor(
    public storage: StorageService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.domain = this.document.location.hostname;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const localUser = this.storage.getLocalUser();

    const N = environment.baseUrl.length;
    const requestToAPI = request.url.substring(0, N) === environment.baseUrl;

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    if (localUser?.token && requestToAPI) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${localUser.token ?? ''}`,
        ),
      });

      request = request.clone({
        headers: request.headers.set('Accept', 'application/json'),
      });

      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }
}

export const AUTHINTERCEPTORPROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
