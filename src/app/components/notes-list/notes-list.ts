import {Component, inject, OnInit} from '@angular/core';
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
  standalone: true
})
export class NotesList implements OnInit {

  private stateService: StateService = inject(StateService);
  public notesState$: Observable<(Note | undefined)[]>;
  public pageInit: number;
  public searchQuery: string;

  constructor() {
    this.notesState$ = this.stateService.storedNotes();
    this.searchQuery = '';
    this.pageInit = PaginationEnum.INITIAL_PAGE;
  }

  public ngOnInit(): void {
    this.loadNotes();
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

  public loadMoreNotes(): void {
    this.pageInit = this.pageInit + 1;
    this.stateService.dispatchLoadNotes(
      {
        page: this.pageInit,
        size: PaginationEnum.PAGE_SIZE,
        search_query: this.searchQuery,
        status: NotesStatus.ACTIVE
      }
    );
  }
}
