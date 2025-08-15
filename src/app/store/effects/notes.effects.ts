import {inject, Injectable} from '@angular/core';
import {NotesHttpService} from '../../services/http/notes-http.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';
import {PageResponse} from '../../domain/responses/page.response';
import {Note} from '../../domain/models/note';
import {NotesActions} from '../actions/actions';

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
            NotesActions.setNotes({pageResponse})
          ),
          catchError((error) =>
            of(NotesActions.loadNotesFailure({error}))
          )
        )
      )
    )
  );

  loadMoreNotes = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.loadMoreNotes),
      mergeMap((payload) =>
        this.notesService.getNotes(payload.request).pipe(
          map((pageResponse: PageResponse<Note>) =>
            NotesActions.addNotes({pageResponse})
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
            NotesActions.storeNote({note: note})
          ),
          catchError((error) =>
            of(NotesActions.loadNotesFailure({error}))
          )
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNote),
      mergeMap((action) =>
        this.notesService.updateNote(action.note).pipe(
          map((note: Note) =>
            NotesActions.updatedNote({note: note})
          ),
          catchError((error) =>
            of(NotesActions.loadNotesFailure({error}))
          )
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.changeStatus),
      mergeMap((action) =>
        this.notesService.updateNote(action.note).pipe(
          map((note: Note) =>
            NotesActions.deletedNote({note: note})
          ),
          catchError((error) =>
            of(NotesActions.loadNotesFailure({error}))
          )
        )
      )
    )
  );
}
