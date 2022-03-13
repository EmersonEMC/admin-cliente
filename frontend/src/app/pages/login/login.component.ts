import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { IData } from './../../shared/interfaces/data.interface';
import { IUserLoggedLogin } from './../../shared/interfaces/user-login.interface';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  message!: string | undefined;
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.isLogged();
  }

  get email() {
    return this.formGroup.get('email');
  }

  get senha() {
    return this.formGroup.get('senha');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.submitted = false;
      const email = <string>this.formGroup.controls['email'].value;
      const senha = <string>this.formGroup.controls['senha'].value;
      this._authService.login(email, senha).subscribe(
        (resp: HttpResponse<IData<IUserLoggedLogin>>) => {
          if (resp.status === 200 && !!resp.body) {
            this._authService.successfulLogin(resp.body.data);
            this.isLogged();
          }

          // setTimeout(() => {
          //   this.submitted = false;
          // }, 50);
        },
        (error: HttpErrorResponse) => {
          this.submitted = false;
          const dataError = error.error as { message: string };
          if (dataError) {
            this.message = dataError.message ?? error.statusText;
          }
        },
      );
    }
  }

  protected isLogged(): void {
    this._authService.isLoggedIn
      .pipe(take(1))
      .subscribe((isLogged: boolean) => {
        if (isLogged) {
          this.catchErrorRouterNavigate('/clientes');
        }
      });
  }

  private catchErrorRouterNavigate(url: string): void {
    this._router.navigate([url])?.catch(() => {
      /** */
    });
  }
}
