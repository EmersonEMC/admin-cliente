import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';

import { IDatatablesResponse } from '../interfaces/idatatables-response';
import { BaseResourceService } from '../services/base-resource.service';
import { DatatablesConfig } from './datatables-config';

@Directive()
export abstract class BaseDataTablesComponent<T> implements OnInit, OnDestroy {
  datatablesConfig = new DatatablesConfig();
  dtTrigger: Subject<ADTSettings> = new Subject();

  constructor(
    protected readonly _resourceService: BaseResourceService<T>,
    public dtOptions: DataTables.Settings = {},
  ) {}

  protected abstract builderTable(): DataTables.ColumnSettings[] | undefined;

  ngOnInit(): void {
    this.dataTablesInitOptions();
  }

  protected dataTablesInitOptions(dtOptions = this.defaultOptions): void {
    const options = dtOptions;
    dtOptions.ajax = (data: unknown, callback: unknown) =>
      this.ajaxDataRequest(data, callback);
    dtOptions.columns = this.builderTable();
    this.dtOptions = Object.assign(
      this.defaultOptions,
      this.dtOptions,
      options,
    );
  }

  protected ajaxDataRequest(
    dataTablesParameters: unknown,
    callback: unknown,
  ): void {
    const parameters = dataTablesParameters as DataTables.AjaxDataRequest;
    const fn = callback as () => void;
    this.getValues(parameters, fn);
  }

  protected getValues(
    dataTablesParameters: DataTables.AjaxDataRequest,
    callback: (dt: DataTables.AjaxData) => void,
  ): void {
    this.search(dataTablesParameters, callback);
  }

  private search(
    dataTablesParameters: DataTables.AjaxDataRequest,
    callback: (dt: DataTables.AjaxData) => void,
  ): void {
    this._resourceService.search(dataTablesParameters).subscribe(
      (response: IDatatablesResponse<T>) => {
        this.actionsForSuccess(response, callback);
      },
      () => {
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: [],
        });
      },
    );
  }

  protected actionsForSuccess(
    response: IDatatablesResponse<T>,
    callback: (dt: DataTables.AjaxData) => void,
  ): void {
    callback({
      recordsTotal: response.recordsTotal ?? 0,
      recordsFiltered: response.recordsFiltered ?? 0,
      data: response.data ?? [],
    });
  }

  protected get defaultOptions(): DataTables.Settings {
    return this.datatablesConfig;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
