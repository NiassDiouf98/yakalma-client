import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-error',
    standalone: true,
    imports: [CommonModule],
  templateUrl: './toast-error.html',
  styleUrls: ['./toast-error.css'],
})
export class ToastError {
  @Input() message: string = '';
  visible: boolean = false;

  show(message: string) {
    this.message = message;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, 3000); // Toast visible for 3 seconds
  }
}
