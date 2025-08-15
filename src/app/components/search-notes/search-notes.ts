import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';
import {StateService} from '../../services/state/state.service';
import {PaginationEnum} from '../../domain/enums/pagination.enum';

@Component({
  selector: 'search-notes',
  templateUrl: './search-notes.html',
  styleUrl: './search-notes.scss',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchNotes implements OnInit {

  public searchForm: FormGroup;
  public searchControl: FormControl;
  private stateService: StateService = inject(StateService);

  constructor() {
    this.searchControl = new FormControl('');
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });
  }

  public ngOnInit(): void {
    this.searchEvent();
  }

  public searchEvent(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(searchValue => {
        this.performSearch(searchValue);
      });
  }

  public performSearch(query: string): void {
    this.stateService.dispatchSearchNotes(
      {
        page: PaginationEnum.INITIAL_PAGE,
        size: PaginationEnum.PAGE_SIZE,
        search_query: query
      }
    );
  }
}
