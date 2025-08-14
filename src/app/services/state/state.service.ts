import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {NotesActions} from '../../store/actions/actions';
import {selectNotesState} from '../../store/selectors/notes.selectors';
import {map, Observable} from 'rxjs';
import {Note} from '../../domain/models/note';
import {FindNotePayload} from '../../domain/payloads/find-note.payload';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private store: Store = inject(Store);

  public dispatchLoadNotes(request: FindNotePayload): void {
    this.store.dispatch(NotesActions.loadNotes({request: request}));
  }

  public storedNotes(): Observable<Note[]> {
    return this.store.select(selectNotesState).pipe(
      map(state => {
        const notes: (Note | undefined)[] = state.entities ? Object.values(state.entities) : [];
        const filteredNotes: Note[] = notes.filter((note: Note | undefined): note is Note => note !== undefined);
        return filteredNotes.sort((left: Note, right: Note) => right.id - left.id);
      })
    );
  }

  public saveNote(note: Partial<Note>): void {
    this.store.dispatch(NotesActions.saveNote({note}));
  }

}
