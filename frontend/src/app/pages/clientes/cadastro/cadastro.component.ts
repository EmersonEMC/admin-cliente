import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientesService } from '../clientes.service';
import { Cliente } from '../entities/cliente.entity';
import { NavigationService } from './../../../shared/services/navigation.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [NavigationService],
})
export class CadastroComponent implements OnInit {
  formGroup!: FormGroup;
  private id!: number;

  constructor(
    private readonly _clientesService: ClientesService,
    private readonly _navigation: NavigationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.route.snapshot.params?.id
      ? Number(this.route.snapshot.params.id)
      : 0;
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      telefone: new FormControl('', [Validators.required]),
    });
    this.loadOnEdit();
  }

  get nome() {
    return this.formGroup.get('nome');
  }

  get dataNascimento() {
    return this.formGroup.get('dataNascimento');
  }

  get cpf() {
    return this.formGroup.get('cpf');
  }

  get rg() {
    return this.formGroup.get('rg');
  }

  get telefone() {
    return this.formGroup.get('telefone');
  }

  private loadOnEdit(): void {
    if (this.id > 0) {
      this._clientesService.getById(this.id).subscribe(
        (value: Cliente) => {
          this.formSetValues(value);
        },
        () => {
          void this.router?.navigate(['/clientes']);
        },
      );
    }
  }

  private formSetValues(cliente: Cliente): void {
    if (cliente) {
      this.formGroup.patchValue(cliente);
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      if (!this.id) {
        this._clientesService
          .create(this.formGroup.value as Cliente)
          .subscribe((value: Cliente) => {
            if (value.id) {
              const url = this.router.url + '/editar';
              void this.router?.navigate([url, value.id]);
            }
          });
      } else {
        this._clientesService
          .update(this.formGroup.value as Cliente)
          .subscribe();
      }
    }
  }

  back(): void {
    this._navigation.back();
  }
}