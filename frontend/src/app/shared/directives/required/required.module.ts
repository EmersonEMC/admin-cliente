import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RequiredDirective } from './required.directive';

@NgModule({
  declarations: [RequiredDirective],
  imports: [CommonModule],
  exports: [RequiredDirective],
})
export class RequiredModule {}
