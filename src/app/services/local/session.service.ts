import {inject, Injectable} from '@angular/core';
import {AuthHttpService} from '../http/auth-http.service';
import {ToastService} from './toast.service';
import {Router} from '@angular/router';
import {KeysEnum} from '../../domain/enums/keys.enum';

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
        this.saveToken(response.token);
        this.toastService.showToast(`Welcome ${response.username}!`, 3000);
        this.router.navigate(['/notes']);
      },
      error: (error: Error) => {
        this.toastService.showToast('Login failed: ' + error.message, 5000);
      }
    });
  }

}
