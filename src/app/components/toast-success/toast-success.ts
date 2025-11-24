import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-success.html',
  styleUrls: ['./toast-success.css'],
})
export class ToastSuccess {
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
