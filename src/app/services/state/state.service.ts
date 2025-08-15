import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {NotesActions, TagsActions} from '../../store/actions/actions';
import {selectNotesNumberPage, selectNotesState, selectNotesTotalPages} from '../../store/selectors/notes.selectors';
import {map, Observable} from 'rxjs';
import {Note} from '../../domain/models/note';
import {FindNotePayload} from '../../domain/payloads/find-note.payload';
import {FilterService} from '../local/filter.service';
import {Tag} from '../../domain/models/tag';
import {selectTagsNumberPage, selectTagsState, selectTagsTotalPages} from '../../store/selectors/tags.selectors';
import {FindTagPayload} from '../../domain/payloads/find-tag.payload';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private store: Store = inject(Store);
  private filterService: FilterService = inject(FilterService);

  public dispatchLoadNotes(request: FindNotePayload): void {
    this.store.dispatch(NotesActions.loadNotes({request}));
  }

  public dispatchSearchNotes(request: FindNotePayload): void {
    this.store.dispatch(NotesActions.loadNotes({
      request: {
        ...request,
        status: this.filterService.getFilterState()
      }
    }));
  }

  public dispatchLoadMoreNotes(request: FindNotePayload): void {
    this.store.dispatch(NotesActions.loadMoreNotes({request: request}));
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

  public selectNotesTotalPages(): Observable<number> {
    return this.store.select(selectNotesTotalPages);
  }

  public selectNotesNumberPage(): Observable<number> {
    return this.store.select(selectNotesNumberPage);
  }

  public saveNote(note: Partial<Note>): void {
    note = {
      ...note,
      status: this.filterService.getFilterState()
    }
    this.store.dispatch(NotesActions.saveNote({note}));
  }

  public updateNote(note: Partial<Note>): void {
    this.store.dispatch(NotesActions.updateNote({note}));
  }

  public changeStatus(note: Partial<Note>): void {
    this.store.dispatch(NotesActions.changeStatus({note}));
  }

  public dispatchLoadTags(request: FindTagPayload): void {
    this.store.dispatch(TagsActions.loadTags({
      request: {
        ...request
      }
    }));
  }

  public dispatchLoadMoreTags(request: FindTagPayload): void {
    this.store.dispatch(TagsActions.loadMoreTags({request: request}));
  }

  public storedTags(): Observable<Tag[]> {
    return this.store.select(selectTagsState).pipe(
      map(state => {
        const tags: (Tag | undefined)[] = state.entities ? Object.values(state.entities) : [];
        const filteredTags: Tag[] = tags.filter((note: Tag | undefined): note is Tag => note !== undefined);
        return filteredTags.sort((left: Tag, right: Tag) => right.id - left.id);
      })
    );
  }

  public selectTagsTotalPages(): Observable<number> {
    return this.store.select(selectTagsTotalPages);
  }

  public selectTagsNumberPage(): Observable<number> {
    return this.store.select(selectTagsNumberPage);
  }
}
