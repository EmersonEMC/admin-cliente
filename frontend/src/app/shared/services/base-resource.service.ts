import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export abstract class BaseResourceService<T> {
  protected readonly http: HttpClient;
  constructor(
    protected readonly apiPath: string,
    protected injector: Injector,
  ) {
    this.http = injector.get(HttpClient);
  }

  protected get options(): {
    headers?: HttpHeaders;
    params?: HttpParams;
  } {
    return {
      params: this.params,
    };
  }

  private get params(): HttpParams {
    return new HttpParams();
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiPath, this.options).pipe(
      map((data) => this.jsonDataToResources<T>(data)),
      take(1),
    );
  }

  getById(id: string | number): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get<T>(url, this.options).pipe(
      map((data) => this.jsonDataToResource<T>(data)),
      take(1),
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post<T>(this.apiPath, resource, this.options).pipe(
      map((data) => this.jsonDataToResource<T>(data)),
      take(1),
    );
  }

  update(resource: T & { _id: string }): Observable<T> {
    const url = `${this.apiPath}/${resource._id}`;
    return this.http.patch<T>(url, resource, this.options).pipe(
      map(() => resource),
      take(1),
    );
  }

  delete(id: string): Observable<unknown> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url, this.options).pipe(take(1));
  }

  protected jsonDataToResources<R>(jsonData: unknown): R[] {
    const data = this.getData(jsonData);
    const resources: R[] = [];
    if (_.isArray(data)) {
      data.forEach((element: unknown) =>
        resources.push(_.cloneDeep(element) as R),
      );
    }
    return resources;
  }

  protected jsonDataToResource<R>(jsonData: unknown): R {
    const data = this.getData(jsonData);
    return _.cloneDeep(data) as R;
  }

  protected getData(jsonData: unknown): unknown {
    const { data = null } = jsonData as { data: unknown };
    return data ?? jsonData;
  }
}
