import { take } from 'rxjs/operators';
import { IUserLogged } from 'src/app/shared/interfaces/user-logged.interface';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../shared/services/auth.service';

import { AuthGuard } from './auth.guard';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

@Injectable()
class FakeAuthService extends AuthService {
  checkLocalUser(): boolean {
    return false;
  }

  successfulLogin(user: IUserLogged): void {
    this.loggedIn.next(true);
  }
}

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let fakeService: AuthService;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/home'];

  const routerSpy = {
    navigate: () => ({ catch: () => jasmine.createSpy }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      providers: [
        { provide: AuthService, useClass: FakeAuthService },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    fakeService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('Not grants access', () => {
    guard
      .checkLogin()
      .pipe(take(1))
      .subscribe((value) => {
        expect(value).toBeFalse();
      });
  });

  it('grants access', () => {
    fakeService.successfulLogin({});
    guard.checkLogin().subscribe((value) => {
      expect(value).toBeTrue();
    });
  });

  it('canActivate', () => {
    fakeUrls.forEach((fakeUrl) => {
      const canActivate: any = guard.canActivate(
        dummyRoute,
        fakeRouterState(fakeUrl),
      );

      canActivate.pipe(take(1)).subscribe((value: boolean) => {
        expect(value).toBeFalse();
      });
    });
  });

  it('canActivateChild', () => {
    fakeUrls.forEach((fakeUrl) => {
      const canActivate: any = guard.canActivateChild(
        dummyRoute,
        fakeRouterState(fakeUrl),
      );

      canActivate.pipe(take(1)).subscribe((value: boolean) => {
        expect(value).toBeFalse();
      });
    });
  });
});
