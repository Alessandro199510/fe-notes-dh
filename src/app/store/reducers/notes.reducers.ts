import {initialNotesState, notesAdapter, NotesState} from '../models/notes.state';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {NotesActions} from '../actions/actions';
import {deletedNote} from '../actions/notes.actions';


export const notesReducers: ActionReducer<NotesState, Action> = createReducer(
  initialNotesState,

  on(NotesActions.loadNotes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(NotesActions.addNotes, (state, {pageResponse}) =>
    notesAdapter.addMany(pageResponse.content, {
      ...state,
      loading: false,
      number: pageResponse.number,
      size: pageResponse.size,
      totalElements: pageResponse.totalElements,
      totalPages: pageResponse.totalPages,
    })
  ),

  on(NotesActions.setNotes, (state, {pageResponse}) =>
    notesAdapter.setAll(pageResponse.content, {
      ...state,
      loading: false,
      number: pageResponse.number,
      size: pageResponse.size,
      totalElements: pageResponse.totalElements,
      totalPages: pageResponse.totalPages,
    })
  ),

  on(NotesActions.storeNote, (state, {note}) =>
    notesAdapter.addOne(note, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(NotesActions.updatedNote, (state, {note}) =>
    notesAdapter.setOne(note, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(NotesActions.deletedNote, (state, {note}) =>
    notesAdapter.removeOne(note.id, state)
  ),
);
