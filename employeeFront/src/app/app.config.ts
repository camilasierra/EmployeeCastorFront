import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()), provideAnimationsAsync(),
  
  ]
};
