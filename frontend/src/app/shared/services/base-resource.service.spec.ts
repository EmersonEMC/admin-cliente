import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { BaseResourceService } from './base-resource.service';

interface IResourceMock {
  id?: string;
  description: string;
}

class BaseResourceServiceTest<T> extends BaseResourceService<T> {}

describe('BaseResourceService<T>', () => {
  let service: BaseResourceServiceTest<IResourceMock>;
  let httpMock: HttpTestingController;
  const url = `${environment.baseUrl}/foos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    const injector = TestBed.inject(Injector);
    service = new BaseResourceServiceTest<IResourceMock>(url, injector);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should get all resources', () => {
      const expected = [{ id: 'iapie757f7', description: 'foo test' }];
      service.getAll().subscribe((resources) => {
        expect(resources).toEqual(expected);
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(expected);
    });
  });

  describe('getById', () => {
    it('should get resource by id', () => {
      const id = 'o5el3e8ju9524escf';
      const expected = { id: id, description: 'Test' };
      service.getById(id).subscribe((resource) => {
        expect(resource).toEqual(expected);
      });
      const req = httpMock.expectOne(`${url}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(expected);
    });
  });

  describe('create', () => {
    it('should create resource', () => {
      const description = 'Resource test';
      const resource = { description };
      const expected = { id: 'o5el3e8ju9524escf', description };
      service.create(resource).subscribe((newResource) => {
        expect(newResource).toEqual(expected);
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('POST');
      req.flush(expected);
    });
  });

  describe('delete', () => {
    it('should delete resource', () => {
      const id = 'o5el3e8ju9524escf';
      const expected = { message: 'deleted!' };
      service.delete(id).subscribe((data) => {
        const resp = data as { message: string };
        expect(resp).toEqual(expected);
      });
      const req = httpMock.expectOne(`${url}/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(expected);
    });
  });

  describe('update', () => {
    it('should update resource', () => {
      const resource = { id: 'o5el3e8ju9524escf', description: 'updated!' };
      service.update(resource).subscribe((data) => {
        expect(data).toEqual(resource);
      });
      const req = httpMock.expectOne(`${url}/${resource.id}`);
      expect(req.request.method).toBe('PATCH');
      req.flush(resource);
    });
  });
});
