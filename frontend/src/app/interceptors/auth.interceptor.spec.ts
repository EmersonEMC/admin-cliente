import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../shared/services/storage.service';
import { IUserLogged } from './../shared/interfaces/user-logged.interface';
import { AuthInterceptor } from './auth.interceptor';

@Injectable()
class FakeStorageService extends StorageService {
  getLocalUser(): IUserLogged {
    return {
      id: 'ljandfsad',
      sub: 'ljandfsad',
      nome: 'Test',
      email: 'test@gmail.com',
      token: '123456789',
      exp: 23342354234,
    };
  }
}

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        AuthInterceptor,
        { provide: StorageService, useClass: FakeStorageService },
      ],
    });
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('grants access', () => {
    let request = new HttpRequest('GET', environment.baseUrl);
    const payload: any = {
      statusText: 'Unauthorized',
      status: 401,
    };
    const response = new HttpErrorResponse(payload);
    const next = {
      handle: jasmine.createSpy('handle').and.callFake(() => of(response)),
    };

    interceptor.intercept(request, next).pipe(take(1)).subscribe();

    request = new HttpRequest('GET', 'http://localhost:8090');

    interceptor
      .intercept(request, next)
      .pipe(take(1))
      .subscribe((resp: any) => {
        expect(resp).toBeDefined();
        expect(resp.statusText).toEqual('Unauthorized');
        expect(resp.status).toEqual(401);
      });
  });
});
