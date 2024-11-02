import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  private apiUrl = 'http://localhost:8088/api/signature'; // Adjust URL as needed

  constructor(private http: HttpClient) {}

  saveSignature(signatureData: string): Observable<any> {
    return this.http.post(this.apiUrl, { signature: signatureData });
  }
  getSignatures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
