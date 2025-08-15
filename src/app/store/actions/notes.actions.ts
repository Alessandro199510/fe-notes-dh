import {createAction, props} from '@ngrx/store';
import {Note} from '../../domain/models/note';
import {PageResponse} from '../../domain/responses/page.response';
import {FindNotePayload} from '../../domain/payloads/find-note.payload';

export const loadNotes = createAction(
  '[Notes] Load Notes',
  props<{ request: FindNotePayload }>()
);

export const loadMoreNotes = createAction(
  '[Notes] Load More Notes',
  props<{ request: FindNotePayload }>()
);

export const loadNotesFailure = createAction(
  '[Notes API] Notes Loaded Failure',
  props<{ error: any }>()
);

export const addNotes = createAction(
  '[Notes API] Notes Loaded Success',
  props<{ pageResponse: PageResponse<Note> }>()
);

export const setNotes = createAction(
  '[Notes API] Notes Set Loaded Success',
  props<{ pageResponse: PageResponse<Note> }>()
);


export const saveNote = createAction(
  '[Notes API] Notes Save note',
  props<{ note: Partial<Note> }>()
);

export const updateNote = createAction(
  '[Notes API] Notes Update note',
  props<{ note: Partial<Note> }>()
);

export const storeNote = createAction(
  '[Notes API] Note saved Success',
  props<{ note: Note }>()
);

export const changeStatus = createAction(
  '[Notes API] Note change status',
  props<{ note: Partial<Note> }>()
);

export const deletedNote = createAction(
  '[Notes API] Note deleted',
  props<{ note: Note }>()
);

export const updatedNote = createAction(
  '[Notes API] Note updated Success',
  props<{ note: Note }>()
);

