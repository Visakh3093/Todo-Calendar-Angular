import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp, } from '@angular/fire/app';
import { environment } from '../environments/environment.development';
import { provideState, provideStore } from '@ngrx/store';
import { modalReducer } from './common/modal/modal.reducer';
import { todoReducer } from './common/todo/todo.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideStore(),provideState({name:'modal',reducer:modalReducer}),provideState({name:'todo',reducer:todoReducer}), provideClientHydration(),importProvidersFrom([
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ])]
};
