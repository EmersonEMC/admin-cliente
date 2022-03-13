import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { IUserLogged } from '../interfaces/user-logged.interface';
import { IData } from './../interfaces/data.interface';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable()
class FakeStorageService {
  getStorageUser(): IUserLogged | null {
    return {
      id: 'ljandfsad',
      sub: 'ljandfsad',
      nome: 'Test',
      email: 'test@gmail.com',
      token: '123456789',
      exp: 23342354234,
    };
  }

  setLocalUser(obj: IUserLogged | null): void {
    /** */
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const expectedUserLogged: IUserLogged = {
    id: 'ljandfsad',
    sub: 'ljandfsad',
    nome: 'Test',
    email: 'test@gmail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDkzMzVjZDIxYWU5NDAwMjgzYjlkMmEiLCJlbWFpbCI6InRlc3RAdnJzb2Z0LmNvbS5iciIsImlhdCI6MTYyMjQ2MzI0NywiZXhwIjoxNjIyNTQ5NjQ3fQ.n2lswdxxCuPfhpJSvHE9zD7aiKwSoTUMtVIywlVyxW0',
    exp: 23342354234,
  };

  const userLoggedData: IData<IUserLogged> = {
    data: expectedUserLogged,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: StorageService, useClass: FakeStorageService },
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('successfulLogin', () => {
    it('should be successfulLogin', () => {
      service.successfulLogin(expectedUserLogged);
      service.isLoggedIn.pipe(take(1)).subscribe((resp: boolean) => {
        expect(resp).toBeTrue();
      });
    });

    it('should not be successfulLogin', () => {
      try {
        service.successfulLogin({});
      } catch (error: any) {
        expect(error.message).toEqual('Token Empty');
      }
    });
  });

  it('should be cleanUserStorage', () => {
    service.cleanUserStorage();
    service.isLoggedIn.pipe(take(1)).subscribe((resp: boolean) => {
      expect(resp).toBeFalse();
    });
  });
});
