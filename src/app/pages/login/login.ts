import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastService} from '../../services/local/toast.service';
import {Router} from '@angular/router';
import {AuthHttpService} from '../../services/http/auth-http.service';
import {SessionService} from '../../services/local/session.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  providers: [AuthHttpService, ToastService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private sessionService: SessionService = inject(SessionService);
  private router: Router = inject(Router);

  public loginForm!: FormGroup;

  public showPassword: boolean;

  private defaultUser: { email: string, password: string };

  constructor() {
    this.loginForm = this.formBuilder.group({});
    this.showPassword = false;
    this.defaultUser = {email: 'ales@email.com', password: 'password'}
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [this.defaultUser.email, [Validators.required, Validators.email]],
      password: [this.defaultUser.password, [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.clearForm();
      this.sessionService.login(formValue.email, formValue.password);
    }
  }

  private clearForm(): void {
    this.loginForm.reset();
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public goRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
