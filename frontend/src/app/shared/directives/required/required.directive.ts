import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

/* eslint-disable @angular-eslint/directive-selector */
@Directive({
  selector: '[required]',
})
export class RequiredDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    if (!this.el?.nativeElement) {
      return;
    }

    const parent = this.renderer.parentNode(
      this.el.nativeElement,
    ) as HTMLElement;

    if (parent.firstChild?.nodeName === 'LABEL') {
      this.renderer.addClass(parent.firstChild, 'required');
    }
  }
}
