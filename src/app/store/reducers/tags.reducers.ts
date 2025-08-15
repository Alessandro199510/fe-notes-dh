import {initialTagsState, tagsAdapter, TagsState} from '../models/tags.state';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {TagsActions} from '../actions/actions';

export const tagsReducers: ActionReducer<TagsState, Action> = createReducer(
  initialTagsState,

  on(TagsActions.loadTags, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TagsActions.addTags, (state, {pageResponse}) =>
    tagsAdapter.addMany(pageResponse.content, {
      ...state,
      loading: false,
      number: pageResponse.number,
      size: pageResponse.size,
      totalElements: pageResponse.totalElements,
      totalPages: pageResponse.totalPages,
    })
  ),

  on(TagsActions.setTags, (state, {pageResponse}) =>
    tagsAdapter.setAll(pageResponse.content, {
      ...state,
      loading: false,
      number: pageResponse.number,
      size: pageResponse.size,
      totalElements: pageResponse.totalElements,
      totalPages: pageResponse.totalPages,
    })
  ),
);
