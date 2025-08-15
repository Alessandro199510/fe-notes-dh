import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {StateService} from '../../services/state/state.service';
import {Observable} from 'rxjs';
import {Tag} from '../../domain/models/tag';
import {PaginationEnum} from '../../domain/enums/pagination.enum';
import {NoteCard} from '../note-card/note-card';
import {PushPipe} from '@ngrx/component';

@Component({
  selector: 'tags-list',
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.scss',
  standalone: true,
  imports: [
    NoteCard,
    PushPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsList implements OnInit {

  public tagsState$: Observable<(Tag | undefined)[]>;
  public totalPages$: Observable<number | undefined>;
  public currentPage$: Observable<number | undefined>;
  public page: number;
  public maxPage: number;
  public searchQuery: string;

  private stateService: StateService = inject(StateService);

  constructor() {
    this.tagsState$ = this.stateService.storedTags();
    this.totalPages$ = this.stateService.selectTagsTotalPages();
    this.currentPage$ = this.stateService.selectTagsNumberPage();
    this.searchQuery = '';
    this.page = PaginationEnum.INITIAL_PAGE;
    this.maxPage = PaginationEnum.INITIAL_PAGE;
  }

  public ngOnInit(): void {
    this.initList();
    this.initTotalPagesSubscriptions();
    this.initCurrentPageSubscriptions();
  }

  public initList(): void {
    this.stateService.dispatchLoadTags(
      {
        page: this.page,
        size: PaginationEnum.PAGE_SIZE,
        search_query: this.searchQuery
      }
    );
  }

  public loadMoreTags(): void {
    this.page = this.page + 1;
    this.stateService.dispatchLoadMoreTags(
      {
        page: this.page,
        size: PaginationEnum.PAGE_SIZE,
        search_query: this.searchQuery
      }
    );
  }

  private initTotalPagesSubscriptions(): void {
    this.stateService.selectTagsTotalPages().subscribe((next: number): void => {
      this.maxPage = next;
    })
  }

  private initCurrentPageSubscriptions(): void {
    this.stateService.selectTagsNumberPage().subscribe((next: number): void => {
      this.page = next;
    })
  }
}
