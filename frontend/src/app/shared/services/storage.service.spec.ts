import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { isString } from 'lodash';

import { IUserLogged } from '../interfaces/user-logged.interface';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  const routerSpy = {
    navigate: () => ({ catch: () => jasmine.createSpy }),
  };

  const userLogged: IUserLogged = {
    id: 'ljandfsad',
    sub: 'ljandfsad',
    nome: 'Test',
    email: 'test@gmail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDkzMzVjZDIxYWU5NDAwMjgzYjlkMmEiLCJlbWFpbCI6InRlc3RAdnJzb2Z0LmNvbS5iciIsImlhdCI6MTYyMjQ2MzI0NywiZXhwIjoxNjIyNTQ5NjQ3fQ.n2lswdxxCuPfhpJSvHE9zD7aiKwSoTUMtVIywlVyxW0',
    supermercado: 'dfdfsdgawew',
    exp: 23342354234,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setLocalUser null', async () => {
    service.setLocalUser(null);
    expect(service.staticStorageUser).toEqual({});
  });

  it('setLocalUser userLogged', async () => {
    service.setLocalUser(userLogged);
    expect(service.staticStorageUser).toEqual(userLogged);
  });

  it('decrypt', async () => {
    const spy = spyOn(localStorage, 'getItem').and.callFake(() =>
      JSON.stringify(userLogged),
    );

    service['decrypt']();
    expect(spy).toHaveBeenCalled();
  });

  it('decrypt null', async () => {
    const spy = spyOn(localStorage, 'getItem').and.callFake(() => null);

    service['decrypt']();
    expect(spy).toHaveBeenCalled();
  });

  it('isJsonString', async () => {
    expect(service.isJsonString(JSON.stringify(userLogged))).toEqual(
      userLogged,
    );
  });

  it('isJsonString null', async () => {
    expect(service.isJsonString(null)).toBeNull();
  });

  it('isJsonString catch', async () => {
    expect(service.isJsonString('{"foo": 1,}')).toBeNull();
  });

  describe('getLocalUser', () => {
    it('', () => {
      const staticStorageUser: any = null;
      service.staticStorageUser = staticStorageUser;
      service.getLocalUser = () => null;
      expect(service.getStorageUser()).toEqual(null);
    });

    it('should be local storage', async () => {
      service.setLocalUser(userLogged);
      service.getLocalUser();
      expect(service.getStorageUser()).toBe(userLogged);
    });
  });

  describe('encrypt', () => {
    it('', () => {
      const storageService: any = service;
      expect(isString(storageService.encrypt('encrypt this text'))).toEqual(
        true,
      );
    });
  });

  describe('crypto', () => {
    it('getDecoded', () => {
      expect(service.getDecoded('teste')).toBeDefined();
    });
  });
});
