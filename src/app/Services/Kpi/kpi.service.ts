import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:8088/";
export interface CategoryProductCount {
  categoryName: string;
  productCount: number;
}
export interface ProjectStatusCount {
  status: string;
  count: number;
}
export interface ClientProjectCountDto {
  clientName: string;
  projectCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  private apiUrl = 'http://localhost:8088/api/Kpi'; // Update this URL to your Spring endpoint

  constructor(private http: HttpClient) {}

  getKpiData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getProductCountsByCategory(): Observable<CategoryProductCount[]> {
    return this.http.get<CategoryProductCount[]>(this.apiUrl+"/category-product-counts");
  }

  getClientCountsByProject(): Observable<ClientProjectCountDto[]> {
    return this.http.get<ClientProjectCountDto[]>(this.apiUrl+"/client-project-counts");
  }
  getProjectCountsByStatus(): Observable<ProjectStatusCount[]> {
    return this.http.get<ProjectStatusCount[]>(this.apiUrl+"/project-status-counts");
  }

}
