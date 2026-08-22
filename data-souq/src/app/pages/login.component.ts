import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <div class="login-page">
      <div class="login-art" aria-hidden="true">
        <app-icon class="login-art-plane" name="plane" [size]="420" />
        <div class="login-art-content">
          <div class="brand">
            <div class="brand-word">QATAR</div>
            <div class="brand-sub"><span class="latin">AIRWAYS</span><span class="ar">القطرية</span></div>
            <div class="brand-pill"><span class="latin">Data Souq</span><span class="ar">سوق البيانات</span></div>
          </div>
          <h1 class="login-tagline">One marketplace for trusted enterprise data.</h1>
          <p class="login-tagline-sub">Discover, access and unlock certified data products across Qatar Airways Group — governed, documented and ready for business use.</p>
          <div class="login-points">
            <span class="login-point"><span class="q-ico q-ico--ok"><app-icon name="check" [size]="11" /></span>1,248 data products across 16 business functions</span>
            <span class="login-point"><span class="q-ico q-ico--ok"><app-icon name="check" [size]="11" /></span>98% certified with published data contracts</span>
            <span class="login-point"><span class="q-ico q-ico--ok"><app-icon name="check" [size]="11" /></span>Access requests routed to accountable data owners</span>
          </div>
        </div>
      </div>

      <div class="login-panel">
        <form class="login-card" (submit)="submit($event)">
          <h2 class="login-title">Sign in</h2>
          <p class="login-sub">Use your Qatar Airways Group staff credentials.</p>

          @if (error()) {
            <div class="login-error" role="alert">{{ error() }}</div>
          }

          <label class="login-label" for="staffId">Staff number</label>
          <input class="login-input" id="staffId" name="staffId" type="text" autocomplete="username"
            placeholder="e.g. QR104281" [value]="staffId()" (input)="staffId.set(asValue($event))" />

          <label class="login-label" for="password">Password</label>
          <input class="login-input" id="password" name="password" type="password" autocomplete="current-password"
            placeholder="••••••••" [value]="password()" (input)="password.set(asValue($event))" />

          <div class="login-row">
            <label class="check"><input type="checkbox" checked />Keep me signed in</label>
            <a class="link-more" href="#" (click)="$event.preventDefault()">Forgot password?</a>
          </div>

          <button class="btn-primary login-submit" type="submit">Sign in</button>

          <div class="login-divider"><span>or</span></div>

          <button class="login-sso" type="button" (click)="sso()">
            <app-icon name="shield" [size]="15" />Sign in with Qatar Airways SSO
          </button>

          <p class="login-note">Access is limited to Qatar Airways Group staff. Activity on Data Souq is logged and monitored.</p>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly returnUrl = input<string>();

  protected readonly staffId = signal('');
  protected readonly password = signal('');
  protected readonly error = signal('');

  protected asValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected submit(event: Event): void {
    event.preventDefault();
    if (!this.staffId().trim() || !this.password()) {
      this.error.set('Enter your staff number and password to sign in.');
      return;
    }
    this.auth.login(this.staffId());
    this.router.navigateByUrl(this.returnUrl() || '/');
  }

  protected sso(): void {
    this.auth.login('QR-SSO');
    this.router.navigateByUrl(this.returnUrl() || '/');
  }
}
