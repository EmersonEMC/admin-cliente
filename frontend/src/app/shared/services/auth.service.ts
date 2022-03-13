import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IData } from '../interfaces/data.interface';
import { IUserLogged } from '../interfaces/user-logged.interface';
import { IUserLoggedLogin } from '../interfaces/user-login.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl?: string;
  jwtHelper: JwtHelperService = new JwtHelperService();

  protected readonly loggedIn: BehaviorSubject<boolean>;
  constructor(private http: HttpClient, private storage: StorageService) {
    this.loggedIn = new BehaviorSubject<boolean>(this.checkLocalUser());
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  protected checkLocalUser(): boolean {
    const userStorage = this.storage.getStorageUser();
    return !!userStorage && !!userStorage.email;
  }

  get localUser(): IUserLogged {
    const userStorage = this.storage.getStorageUser();
    return userStorage ?? ({} as IUserLogged);
  }

  login(
    email: string,
    senha: string,
  ): Observable<HttpResponse<IData<IUserLoggedLogin>>> {
    return this.http
      .post<IData<IUserLoggedLogin>>(
        `${environment.baseUrl}/auth/login`,
        { email, senha },
        {
          observe: 'response',
          responseType: 'json',
        },
      )
      .pipe(take(1));
  }

  successfulLogin(user: IUserLogged): void {
    if (user.token) {
      const userLogged = this.jwtHelper.decodeToken<IUserLogged>(user.token);
      const exp = userLogged.exp;
      const userLocal: IUserLogged = {
        ...user,
        exp,
      };

      this.storage.setLocalUser(userLocal);
      this.loggedIn.next(true);
    } else {
      throw new Error('Token Empty');
    }
  }

  cleanUserStorage(): void {
    this.storage.setLocalUser(null);
    this.loggedIn.next(false);
  }
}
