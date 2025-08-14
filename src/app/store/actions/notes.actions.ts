import {createAction, props} from '@ngrx/store';
import {Note} from '../../domain/models/note';
import {PageResponse} from '../../domain/responses/page.response';
import {FindNotePayload} from '../../domain/payloads/find-note.payload';

export const loadNotes = createAction(
  '[Notes] Load Notes',
  props<{ request: FindNotePayload }>()
);

export const loadNotesFailure = createAction(
  '[Notes API] Notes Loaded Failure',
  props<{ error: any }>()
);

export const storeNotes = createAction(
  '[Notes API] Notes Loaded Success',
  props<{ pageResponse: PageResponse<Note> }>()
);

export const saveNote = createAction(
  '[Notes API] Notes Save note',
  props<{ note: Partial<Note> }>()
);

export const storeNote = createAction(
  '[Notes API] Note saved Success',
  props<{ note: Note }>()
);

