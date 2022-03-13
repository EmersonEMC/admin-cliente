interface IDataTables {
  pageLength?: number;
  searching?: boolean;
  pagingType?: string;
  responsive?: boolean;
  processing?: boolean;
  serverSide?: boolean;
  deferRender?: boolean;
  scrollX?: boolean;
  paging?: boolean;
  destroy?: boolean;
  stateSave?: boolean;
  dom?: string;
  lengthMenu?: number[][];
  rowCallback?: (row: Node, data: unknown, index: number) => void;
}

export class DatatablesConfig implements IDataTables {
  pageLength = 10;
  searching = false;
  pagingType = 'simple_numbers';
  responsive = true;
  processing = true;
  serverSide = true;
  deferRender = true;
  scrollX = false;
  paging = true;
  destroy = true;
  stateSave = false;
  dom = '';
  lengthMenu = [
    [10, 15, 25, 50, 100],
    [10, 15, 25, 50, 100],
  ];

  constructor(options?: IDataTables) {
    Object.assign(this, options);
  }
}
