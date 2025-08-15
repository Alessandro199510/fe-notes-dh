import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {NotesList} from '../../components/notes-list/notes-list';
import {NoteForm} from '../../components/note-form/note-form';
import {SessionService} from '../../services/local/session.service';
import {NoSelectNote} from '../../components/no-select-note/no-select-note';
import {Note} from '../../domain/models/note';
import {SearchNotes} from '../../components/search-notes/search-notes';
import {FilterService} from '../../services/local/filter.service';
import {NotesStatus} from '../../domain/enums/notes-status.enum';
import {PaginationEnum} from '../../domain/enums/pagination.enum';
import {StateService} from '../../services/state/state.service';
import {TagsList} from '../../components/tags-list/tags-list';

@Component({
  selector: 'app-dashboard',
  imports: [NotesList, NoteForm, NoSelectNote, SearchNotes, TagsList],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit {

  private sessionService: SessionService = inject(SessionService);
  private filterService: FilterService = inject(FilterService);
  private stateService: StateService = inject(StateService);

  public showNoteData: boolean;
  public selectedNote: Note | null;

  constructor() {
    this.showNoteData = false;
    this.selectedNote = null;
  }

  public ngOnInit(): void {
    this.loadNotes();
  }

  public logout(): void {
    this.sessionService.logout();
  }

  public hideNoteData(): void {
    this.showNoteData = false;
  }

  public showForm(note: Note | null): void {
    this.showNoteData = true;
    this.selectedNote = note;
  }

  public removeFilter(): void{
    this.filterService.setFilterState(null);
    this.loadNotes();
  }

  public setFilter(): void{
    this.loadNotes(NotesStatus.ARCHIVED);
    this.filterService.setFilterState(NotesStatus.ARCHIVED);
  }

  private loadNotes(status: NotesStatus = NotesStatus.ACTIVE): void {
    this.stateService.dispatchLoadNotes(
      {
        page: PaginationEnum.INITIAL_PAGE,
        size: PaginationEnum.PAGE_SIZE,
        search_query: '',
        status: status
      }
    );
  }
}
