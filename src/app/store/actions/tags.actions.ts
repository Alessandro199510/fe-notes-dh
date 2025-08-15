import {createAction, props} from '@ngrx/store';
import {Tag} from '../../domain/models/tag';
import {PageResponse} from '../../domain/responses/page.response';
import {FindTagPayload} from '../../domain/payloads/find-tag.payload';

export const loadTags = createAction(
  '[Tags] Load Tags',
  props<{ request: FindTagPayload }>()
);

export const loadMoreTags = createAction(
  '[Tags] Load More Tags',
  props<{ request: FindTagPayload }>()
);

export const loadTagsFailure = createAction(
  '[Tags API] Tags Loaded Failure',
  props<{ error: any }>()
);

export const addTags = createAction(
  '[Notes API] Tags Loaded Success',
  props<{ pageResponse: PageResponse<Tag> }>()
);

export const setTags = createAction(
  '[Tags API] Tags Set Loaded Success',
  props<{ pageResponse: PageResponse<Tag> }>()
);

export const saveTag = createAction(
  '[Tags API] Tags Save Tag',
  props<{ Tag: Partial<Tag> }>()
);

export const deletedTag = createAction(
  '[Tags API] Tag deleted',
  props<{ Tag: Tag }>()
);

