import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  private _loading: Subject<boolean> = this._loadService.isLoading;

  constructor(private _loadService: LoaderService) {}

  get loading(): Subject<boolean> {
    return this._loading;
  }
}
