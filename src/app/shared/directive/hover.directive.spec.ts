import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HoverDirective } from './hover.directive';

@Component({
  template: `
    <div appHover></div>
  `,
})

class TestComponent {}
describe('HoverDirective', () => {
  
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, HoverDirective],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    const directive = fixture.debugElement.nativeElement.querySelector('[appHover]');
    expect(directive).toBeTruthy();
  });

  it('Checking mouse enter event', () => {
    const directiveElement = fixture.debugElement.nativeElement.querySelector('[appHover]');
    directiveElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    
    const transform = directiveElement.style.transform;
    const boxShadow = directiveElement.style.boxShadow;
    expect(transform).toContain('translateY(-7%)');
    expect(boxShadow).toContain('rgba(234, 230, 215, 0.25) 0px 13px 47px -5px, rgba(242, 226, 226, 0.3) 0px 8px 16px -8px');
  });


  it('Checking mouse leave event', () => {
    const directiveElement = fixture.debugElement.nativeElement.querySelector('[appHover]');
    directiveElement.dispatchEvent(new Event('mouseenter'));
    directiveElement.dispatchEvent(new Event('mouseleave'));
    
    fixture.detectChanges();
    expect(directiveElement.style.transform).toBe('');
    expect(directiveElement.style.boxShadow).toBe('');
  });
});
