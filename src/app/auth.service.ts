import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://134.209.35.1/api/registrar';
  private verifyUrl = 'http://134.209.35.1/api/verificarCodigo';
  private loginUrl = 'http://134.209.35.1/api/login';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  verifyCode(email: string, codigo: string): Observable<any> {
    return this.http.post<any>(this.verifyUrl, { email, codigo });
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData);
  }
}
