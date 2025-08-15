import {inject, Injectable} from '@angular/core';
import {TagsHttpService} from '../../services/http/tags-http.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';
import {PageResponse} from '../../domain/responses/page.response';
import {Tag} from '../../domain/models/tag';
import {TagsActions} from '../actions/actions';

@Injectable()
export class TagsEffects {

  private tagsService: TagsHttpService = inject(TagsHttpService);
  private actions$: Actions = inject(Actions);

  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagsActions.loadTags),
      mergeMap((payload) =>
        this.tagsService.getTags(payload.request).pipe(
          map((pageResponse: PageResponse<Tag>) =>
            TagsActions.setTags({pageResponse})
          ),
          catchError((error) =>
            of(TagsActions.loadTagsFailure({error}))
          )
        )
      )
    )
  );

  loadMoreTags = createEffect(() =>
    this.actions$.pipe(
      ofType(TagsActions.loadMoreTags),
      mergeMap((payload) =>
        this.tagsService.getTags(payload.request).pipe(
          map((pageResponse: PageResponse<Tag>) =>
            TagsActions.addTags({pageResponse})
          ),
          catchError((error) =>
            of(TagsActions.loadTagsFailure({error}))
          )
        )
      )
    )
  );

}
