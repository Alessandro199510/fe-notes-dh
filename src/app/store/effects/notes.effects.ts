import {inject, Injectable} from '@angular/core';
import {NotesHttpService} from '../../services/http/notes-http.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, Observable, of} from 'rxjs';
import {PageResponse} from '../../domain/responses/page.response';
import {Note} from '../../domain/models/note';
import {NotesActions} from '../actions/actions';
import {storeNote} from '../actions/notes.actions';

@Injectable()
export class NotesEffects {


  private notesService: NotesHttpService = inject(NotesHttpService);
  private actions$: Actions = inject(Actions);


  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.loadNotes),
      mergeMap((payload) =>
        this.notesService.getNotes(payload.request).pipe(
          map((pageResponse: PageResponse<Note>) =>
            NotesActions.storeNotes({pageResponse})
          ),
          catchError((error) =>
            of(NotesActions.loadNotesFailure({error}))
          )
        )
      )
    )
  );


  saveNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.saveNote),
      mergeMap((action) =>
        this.notesService.saveNote(action.note).pipe(
          map((note: Note) =>
            NotesActions.storeNote({ note: note })
          ),
          catchError((error) =>
            of(NotesActions.loadNotesFailure({ error }))
          )
        )
      )
    )
  );

}
