import {Component, inject, OnInit} from '@angular/core';
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
  providers: [AuthHttpService, ToastService]
})
export class Login implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private sessionService: SessionService = inject(SessionService);
  private router: Router = inject(Router);

  public loginForm!: FormGroup;

  public showPassword: boolean;

  constructor() {
    this.loginForm = this.formBuilder.group({});
    this.showPassword = false;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['ales@mail.com', [Validators.required, Validators.email]],
      password: ['1234', [Validators.required]],
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
