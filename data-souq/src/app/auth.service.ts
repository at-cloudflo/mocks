import { Injectable, computed, signal } from '@angular/core';

export interface SessionUser {
  name: string;
  initials: string;
  role: string;
  staffId: string;
}

const STORAGE_KEY = 'datasouq.session';

/** Mock authentication — any staff number and password sign in the demo persona. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<SessionUser | null>(restore());
  readonly loggedIn = computed(() => this.user() !== null);

  login(staffId: string): SessionUser {
    const user: SessionUser = {
      name: 'Ali Tlili',
      initials: 'AT',
      role: 'Finance Analyst',
      staffId: staffId.trim().toUpperCase(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.user.set(user);
    return user;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.user.set(null);
  }
}

function restore(): SessionUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}
