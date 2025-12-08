import { Component, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
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
import { ToastSuccess } from '../toast-success/toast-success';
import { ToastError } from '../toast-error/toast-error';

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
    FormsModule,
    ToastSuccess,
    ToastError
  ],
  templateUrl: './dish-detail.html',
  styleUrl: './dish-detail.css',
})
export class DishDetail {
  @Output() addToOrder = new EventEmitter<any>();

  @ViewChild(ToastSuccess) toastSuccess!: ToastSuccess;
  @ViewChild(ToastError) toastError!: ToastError;

  quantity: number = 1;
  specialInstructions: string = '';
  selectedSupplements: { name: string; price: number }[] = [];

  constructor(
    public dialogRef: MatDialogRef<DishDetail>,
    @Inject(MAT_DIALOG_DATA) public dish: Dish
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onAddToOrder(): void {
    const supplementsPrice = this.selectedSupplements.reduce((total, sup) => total + sup.price, 0);
    const orderDetails = {
      dish: this.dish,
      quantity: this.quantity,
      specialInstructions: this.specialInstructions,
      selectedSupplements: this.selectedSupplements,
      totalPrice: (this.dish.price + supplementsPrice) * this.quantity
    };
    this.dialogRef.close(orderDetails);
    // Show success toast after order added
    this.toastSuccess.show("Commande ajoutée avec succès !");
    // If error handling existed, could call this.toastError.show('Erreur lors de l\'ajout de la commande.');
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

  isSupplementSelected(supplement: { name: string; price: number }): boolean {
    return this.selectedSupplements.some(selected => selected.name === supplement.name);
  }

  toggleSupplement(supplement: { name: string; price: number }): void {
    const index = this.selectedSupplements.findIndex(selected => selected.name === supplement.name);
    if (index > -1) {
      this.selectedSupplements.splice(index, 1);
    } else {
      this.selectedSupplements.push(supplement);
    }
  }

  getTotalPrice(): number {
    const supplementsPrice = this.selectedSupplements.reduce((total, sup) => total + sup.price, 0);
    return (this.dish.price + supplementsPrice) * this.quantity;
  }
}
