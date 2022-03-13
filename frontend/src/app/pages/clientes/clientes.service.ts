import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Cliente } from './entities/cliente.entity';

const url = `${environment.baseUrl}/clientes`;

@Injectable({
  providedIn: 'root',
})
export class ClientesService extends BaseResourceService<Cliente> {
  constructor(protected injector: Injector) {
    super(url, injector);
  }
}
