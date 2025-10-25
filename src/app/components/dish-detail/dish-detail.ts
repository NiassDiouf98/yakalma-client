import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Dish } from '../../core/models/dish';

@Component({
  selector: 'app-dish-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './dish-detail.html',
  styleUrl: './dish-detail.css',
})
export class DishDetail {
  @Output() addToOrder = new EventEmitter<any>();

  quantity: number = 1;
  specialInstructions: string = '';
  selectedSupplements: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DishDetail>,
    @Inject(MAT_DIALOG_DATA) public dish: Dish
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onAddToOrder(): void {
    const orderDetails = {
      dish: this.dish,
      quantity: this.quantity,
      specialInstructions: this.specialInstructions,
      selectedSupplements: this.selectedSupplements,
      totalPrice: this.dish.price * this.quantity
    };
    this.dialogRef.close(orderDetails);
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Entrée': 'primary',
      'Plat Principal': 'accent',
      'Dessert': 'warn',
      'Boisson': 'primary',
      'Accompagnement': 'accent'
    };
    return colors[category] || 'basic';
  }
}
