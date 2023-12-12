import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return afAuth.authState.pipe(
    take(1),
    map(user => {
      const isAuthenticated = !!user;
      if (!isAuthenticated) {
        router.navigate(['/signin']);
        return false;
      }
      return true;
    })
  );
};