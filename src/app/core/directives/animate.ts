import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appAnimate]',
  standalone: true
})
export class AnimateDirective implements OnInit {
  @Input('appAnimate') animationType: string = 'fadeIn';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.applyAnimation();
  }

  private applyAnimation() {
    const element = this.el.nativeElement;

    // Add initial styles for animation
    this.renderer.addClass(element, 'animate-element');

    // Apply specific animation based on type
    switch (this.animationType) {
      case 'fadeIn':
        this.fadeInAnimation(element);
        break;
      case 'slideIn':
        this.slideInAnimation(element);
        break;
      case 'scaleIn':
        this.scaleInAnimation(element);
        break;
      default:
        this.fadeInAnimation(element);
    }
  }

  private fadeInAnimation(element: any) {
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', 'translateY(20px)');
    this.renderer.setStyle(element, 'transition', 'opacity 0.6s ease-out, transform 0.6s ease-out');

    // Trigger animation after a small delay
    setTimeout(() => {
      this.renderer.setStyle(element, 'opacity', '1');
      this.renderer.setStyle(element, 'transform', 'translateY(0)');
    }, 100);
  }

  private slideInAnimation(element: any) {
    this.renderer.setStyle(element, 'transform', 'translateX(-100%)');
    this.renderer.setStyle(element, 'transition', 'transform 0.8s ease-out');

    setTimeout(() => {
      this.renderer.setStyle(element, 'transform', 'translateX(0)');
    }, 100);
  }

  private scaleInAnimation(element: any) {
    this.renderer.setStyle(element, 'transform', 'scale(0.8)');
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transition', 'transform 0.5s ease-out, opacity 0.5s ease-out');

    setTimeout(() => {
      this.renderer.setStyle(element, 'transform', 'scale(1)');
      this.renderer.setStyle(element, 'opacity', '1');
    }, 100);
  }
}
