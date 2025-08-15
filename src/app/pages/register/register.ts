import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SessionService} from '../../services/local/session.service';
import {Router} from '@angular/router';
import {AuthHttpService} from '../../services/http/auth-http.service';
import {ToastService} from '../../services/local/toast.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  standalone: true,
  providers: [AuthHttpService, ToastService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private sessionService: SessionService = inject(SessionService);
  private router: Router = inject(Router);

  public registerForm!: FormGroup;

  public showPassword: boolean;

  constructor() {
    this.registerForm = this.formBuilder.group({});
    this.showPassword = false;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.clearForm();
      this.sessionService.register(formValue.username, formValue.email, formValue.password);
    }
  }

  private clearForm(): void {
    this.registerForm.reset();
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public goLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
