import { Component, OnInit } from '@angular/core';

import { AuthService } from './../shared/services/auth.service';

import { faHome, faPowerOff, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  faPowerOff = faPowerOff;
  faHome = faHome;
  faUsers = faUsers;

  constructor(private readonly _authService: AuthService) {
    /** */
  }

  ngOnInit(): void {
    return;
  }

  logout(): void {
    this._authService.cleanUserStorage();
    this.reload();
  }

  reload(windowLocation = location): void {
    windowLocation.reload();
  }
}
