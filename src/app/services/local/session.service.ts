import {inject, Injectable} from '@angular/core';
import {AuthHttpService} from '../http/auth-http.service';
import {ToastService} from './toast.service';
import {Router} from '@angular/router';
import {KeysEnum} from '../../domain/enums/keys.enum';
import {User} from '../../domain/models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private authHttpService: AuthHttpService = inject(AuthHttpService);
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  private readonly tokenKey: string;

  constructor() {
    this.tokenKey = KeysEnum.AUTH_TOKEN;
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public login(email: string, password: string): void {
    this.authHttpService.login(email, password).subscribe({
      next: (response: { username: string, token: string }): void => {
        this.loginSuccess(response.token, response.username);
      },
      error: (error: Error) => {
        this.toastService.showToast('Login failed: ' + error.message, 5000);
      }
    });
  }

  public register(username: string, email: string, password: string): void {
    this.authHttpService.register(username, email, password).subscribe({
      next: (response: User): void => {
        this.loginSuccess(response.token, response.username);
      },
      error: (error: Error) => {
        this.toastService.showToast('Register failed: ', 5000);
      }
    });
  }

  public logout(): void {
    this.clearToken();
    this.router.navigate(['/auth/login']);
  }

  private loginSuccess(token: string, username: string): void {
    this.saveToken(token);
    this.toastService.showToast(`Welcome ${username}!`, 3000);
    this.router.navigate(['/notes']);
  }

}
