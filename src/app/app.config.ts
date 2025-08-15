import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideHttpClient} from '@angular/common/http';
import {notesReducers} from './store/reducers/notes.reducers';
import {NotesEffects} from './store/effects/notes.effects';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {TagsEffects} from './store/effects/tags.effects';
import {tagsReducers} from './store/reducers/tags.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore(),

    //State
    provideStore({notes: notesReducers, tags: tagsReducers}),
    provideEffects([NotesEffects, TagsEffects]),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
  ]
};
