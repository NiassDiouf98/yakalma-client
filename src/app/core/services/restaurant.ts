import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  managerName: string;
  status: string;
  // Add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRestaurantProfile(): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/profile`);
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/restaurants/${id}`);
  }

  // Add other methods as needed
}
