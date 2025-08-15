import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {PushPipe} from '@ngrx/component';
import {StateService} from '../../services/state/state.service';
import {PaginationEnum} from '../../domain/enums/pagination.enum';
import {Observable} from 'rxjs';
import {Note} from '../../domain/models/note';
import {NotesStatus} from '../../domain/enums/notes-status.enum';
import {NoteCard} from '../note-card/note-card';

@Component({
  selector: 'notes-list',
  imports: [PushPipe, NoteCard],
  templateUrl: './notes-list.html',
  styleUrl: './notes-list.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesList implements OnInit {

  public notesState$: Observable<(Note | undefined)[]>;
  public totalPages$: Observable<number | undefined>;
  public currentPage$: Observable<number | undefined>;
  public page: number;
  public maxPage: number;
  public searchQuery: string;

  @Output()
  public showFormEvent: EventEmitter<Note | null>;

  private stateService: StateService = inject(StateService);

  constructor() {
    this.notesState$ = this.stateService.storedNotes();
    this.totalPages$ = this.stateService.selectNotesTotalPages();
    this.currentPage$ = this.stateService.selectNotesNumberPage();
    this.searchQuery = '';
    this.page = PaginationEnum.INITIAL_PAGE;
    this.maxPage = PaginationEnum.INITIAL_PAGE;
    this.showFormEvent = new EventEmitter<Note | null>();
  }

  public ngOnInit(): void {
    this.loadNotes();
    this.initTotalPagesSubscriptions();
    this.initCurrentPageSubscriptions();
  }

  public loadMoreNotes(): void {
    this.page = this.page + 1;
    this.stateService.dispatchLoadMoreNotes(
      {
        page: this.page,
        size: PaginationEnum.PAGE_SIZE,
        search_query: this.searchQuery,
        status: NotesStatus.ACTIVE
      }
    );
  }

  private loadNotes(): void {
    this.stateService.dispatchLoadNotes(
      {
        page: PaginationEnum.INITIAL_PAGE,
        size: PaginationEnum.PAGE_SIZE,
        search_query: this.searchQuery,
        status: NotesStatus.ACTIVE
      }
    );
  }

  public emitShowForm(note?: Note): void {
    this.showFormEvent.emit(note || null);
  }

  private initTotalPagesSubscriptions(): void {
    this.stateService.selectNotesTotalPages().subscribe((next: number): void => {
      this.maxPage = next;
    })
  }

  private initCurrentPageSubscriptions(): void {
    this.stateService.selectNotesNumberPage().subscribe((next: number): void => {
      this.page = next;
    })
  }
}
