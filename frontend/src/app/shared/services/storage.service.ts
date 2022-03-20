import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { isNil, isString } from 'lodash';

import { StorageKeyEnum } from '../enums/storage-key.enum';
import { IUserLogged } from '../interfaces/user-logged.interface';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private static storageUser: IUserLogged;

  constructor(private router: Router) {}

  get staticStorageUser(): IUserLogged {
    return StorageService.storageUser;
  }

  set staticStorageUser(user: IUserLogged) {
    StorageService.storageUser = user;
  }

  getStorageUser(): IUserLogged | null {
    const staticStorageUser = this.getLocalUser();
    if (staticStorageUser) {
      this.staticStorageUser = staticStorageUser;
    } else {
      this.setLocalUser(null);
      this.router.navigate(['/login']).catch(() => {
        /** */
      });
    }

    return staticStorageUser;
  }

  getLocalUser(): IUserLogged | null {
    return this.staticStorageUser ?? this.isJsonString(this.decrypt());
  }

  setLocalUser(obj: IUserLogged | null): void {
    if (isNil(obj)) {
      localStorage.removeItem(StorageKeyEnum.localUser);
      this.staticStorageUser = {} as IUserLogged;
    } else {
      localStorage.setItem(StorageKeyEnum.localUser, this.encrypt(obj));
      this.staticStorageUser = obj;
    }
  }

  isJsonString(value: string | null): IUserLogged | null {
    let user: IUserLogged | null = null;
    try {
      if (!isNil(value)) {
        user = JSON.parse(value) as IUserLogged;
      }
    } catch (error) {
      return null;
    }

    return user;
  }

  private encrypt(value: unknown): string {
    const decoded: string = isString(value) ? value : JSON.stringify(value);
    const encoded = this.getEncoded(decoded);
    return enc.Base64.stringify(enc.Utf8.parse(encoded));
  }

  getEncoded(value: string): string {
    const cipherHelper = AES;
    return cipherHelper.encrypt(value, environment.CRYPTOJS_SECRET).toString();
  }

  private decrypt(): string | null {
    let decoded = null;
    try {
      const user = localStorage.getItem(StorageKeyEnum.localUser);
      if (!isNil(user)) {
        const decData = enc.Base64.parse(user).toString(enc.Utf8);
        decoded = this.getDecoded(decData);
      }
    } catch (error) {
      return null;
    }

    return decoded;
  }

  getDecoded(value: string): string {
    const cipherHelper = AES;
    return cipherHelper
      .decrypt(value, environment.CRYPTOJS_SECRET)
      .toString(enc.Utf8);
  }
}
