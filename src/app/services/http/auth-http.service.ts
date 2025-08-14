import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  private http: HttpClient = inject(HttpClient);
  private readonly API_URL: string;

  constructor() {
    this.API_URL = '/api/auth';
  }

  public login(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post(`${this.API_URL}/login`, body);
  }

  public register(username: string, email: string, password: string): Observable<any> {
    const body = {username, email, password};
    return this.http.post(`${this.API_URL}/register`, body);
  }
}
