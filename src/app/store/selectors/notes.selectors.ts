import {createFeatureSelector, createSelector} from '@ngrx/store';
import {notesAdapter, NotesState} from '../models/notes.state';

export const selectNotesState = createFeatureSelector<NotesState>('notes');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = notesAdapter.getSelectors(selectNotesState);

export const selectNotesLoading = createSelector(
  selectNotesState,
  (state) => state.loading
);

export const selectNotesError = createSelector(
  selectNotesState,
  (state) => state.error
);

export const selectNoteById = (id: string) =>
  createSelector(selectEntities, (entities) => entities[id]);

