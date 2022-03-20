import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { cpfValidator } from 'src/app/shared/components/form/forms-validations';

import { ClientesService } from '../clientes.service';
import { Address } from '../entities/addess.entity';
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
  private idCliente!: number;
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(
    private readonly _clientesService: ClientesService,
    private readonly _navigation: NavigationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.idCliente = this.route.snapshot.params?.id
      ? Number(this.route.snapshot.params.id)
      : 0;
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        cpfValidator,
      ]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      addresses: new FormArray([]),
    });
    this.loadOnEdit();
  }

  get addresses() {
    return this.formGroup.get('addresses') as FormArray;
  }

  getFormaArray(i: number, description: string) {
    return this.getControls()[i].get(description);
  }

  getControls() {
    return (<FormArray>this.formGroup.get('addresses')).controls;
  }

  get name() {
    return this.formGroup.get('name');
  }

  get birthday() {
    return this.formGroup.get('birthday');
  }

  get cpf() {
    return this.formGroup.get('cpf');
  }

  get rg() {
    return this.formGroup.get('rg');
  }

  get phone() {
    return this.formGroup.get('phone');
  }

  private createAddressFormGroup(): FormGroup {
    return new FormGroup({
      description: new FormControl('', [Validators.required]),
      number: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
      ]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    });
  }

  addAdress() {
    this.addresses.push(this.createAddressFormGroup());
  }

  deleteAdress(adressIndex: number) {
    this.addresses.removeAt(adressIndex);
  }

  private loadOnEdit(): void {
    if (this.idCliente > 0) {
      this._clientesService.getById(this.idCliente).subscribe(
        (value: Cliente) => {
          this.createFormAddress(value.addresses);
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

  private createFormAddress(addresses: Address[]): void {
    if (Object.keys(addresses).length > 0) {
      addresses.forEach(() => {
        this.addresses.push(this.createAddressFormGroup());
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      if (!this.idCliente) {
        this._clientesService
          .create(this.formGroup.value as Cliente)
          .subscribe(() => {
            void this.router?.navigate(['/clientes']);
          });
      } else {
        this._clientesService
          .update(this.formGroup.value as Cliente, this.idCliente)
          .subscribe();
      }
    }
  }

  trackByMethod(index: number): number {
    return index;
  }

  back(): void {
    this._navigation.back();
  }
}
