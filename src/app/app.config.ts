import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'littlelinguist-93a2c',
        appId: '1:724835509733:web:cdd22505f0a5c9165bbb0c',
        storageBucket: 'littlelinguist-93a2c.appspot.com',
        apiKey: 'AIzaSyBdsFDIgRHrW2wt3gyRQj19OA-1qMaz1lE',
        authDomain: 'littlelinguist-93a2c.firebaseapp.com',
        messagingSenderId: '724835509733',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
