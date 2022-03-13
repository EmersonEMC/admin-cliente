export interface IDatatablesResponse<T> extends DataTables.AjaxData {
  message?: string;
  data: Array<T>;
  recordsFiltered: number;
  recordsTotal: number;
}
