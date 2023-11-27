import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})

export class HoverDirective {

  @HostBinding('style.transform') transform:string = '';
  @HostBinding('style.boxShadow') boxShadow:string = '';

  constructor() { }

  @HostListener('mouseenter') mouseEnter()
  {
    this.transform = 'translateY(-7%)';
    this.boxShadow = 'rgba(234, 230, 215, 0.25) 0px 13px 47px -5px, rgba(242, 226, 226, 0.3) 0px 8px 16px -8px';
  }

  @HostListener('mouseleave') mouseLeave() {
    this.transform = ''; // Reset transform on mouse leave
    this.boxShadow = ''; // Reset box-shadow on mouse leave
  }
}
