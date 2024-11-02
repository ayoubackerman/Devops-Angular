import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Helper {
  baseUrl: string = 'http://localhost:8088/api/';
}