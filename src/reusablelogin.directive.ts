import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[loginDirective]'
})
export class LoginDirective {

  constructor(private el: ElementRef) {
  }

}
