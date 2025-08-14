import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Note} from '../../domain/models/note';

export interface NotesState extends EntityState<Note> {
  number: number,
  size: number,
  totalElements: number,
  totalPages: number,
  loading: boolean;
  error: any | null;
}


export const notesAdapter: EntityAdapter<Note> = createEntityAdapter<Note>({
  selectId: (note: Note): number => note.id,
  sortComparer: (left: Note, right: Note) => right.id - left.id,
});

export const initialNotesState: NotesState = notesAdapter.getInitialState({
  number: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  loading: false,
  error: null,
});
