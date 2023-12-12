import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

interface UserData {
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}

  getCurrentUserName(): Observable<string> {
    return this.afAuth.authState.pipe(
      map(user => {
        console.log('Auth State User:', user);
        return user?.displayName || 'User';
      })
    );
  }
  
  //authentication tings
  signIn(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user) {
          return this.afs.collection('users').doc(user.uid).get().toPromise()
            .then(docSnapshot => {
              if (docSnapshot && docSnapshot.exists) {
                const userData = docSnapshot.data() as UserData;
                if (userData.isAdmin) {
                  this.router.navigate(['/admin-dashboard']);
                } else {
                  this.router.navigate(['/dashboard']);
                }
              } else {
                throw new Error('User data not found');
              }
            });
        } else {
          throw new Error('User not found');
        }
      })
      .catch(error => {
        console.error('Sign-in error:', error.message);
      });
  }
  
  

  signUp(email: string, password: string, additionalData: any): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Update the user's profile
        const user = userCredential.user;
        if (user) {
          return user.updateProfile({
            displayName: additionalData.displayName
          }).then(() => {
            return this.afs.collection('users').doc(user.uid).set(additionalData);
          });
        } else {
          throw new Error("User not found after sign-up");
        }
      })
      .then(() => {
        console.log("Student registered:", this.afAuth.currentUser);
        this.router.navigate(['/signin']);
      })
      .catch((error) => {
        console.error('Registration error:', error.message);
      });
  }
  
  signOut(): void {
    this.afAuth.signOut().then(() => {
      console.log("User signed out successfully: " ,this.afAuth.currentUser);
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  }
}
