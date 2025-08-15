import {createFeatureSelector, createSelector} from '@ngrx/store';
import {tagsAdapter, TagsState} from '../models/tags.state';

export const selectTagsState = createFeatureSelector<TagsState>('tags');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = tagsAdapter.getSelectors(selectTagsState);

export const selectTagsLoading = createSelector(
  selectTagsState,
  (state: TagsState) => state.loading
);

export const selectTagsError = createSelector(
  selectTagsState,
  (state: TagsState) => state.error
);

export const selectTagById = (id: string) =>
  createSelector(selectEntities, (entities) => entities[id]);

export const selectTagsTotalPages = createSelector(
  selectTagsState,
  (state: TagsState): number => state.totalPages
);

export const selectTagsNumberPage = createSelector(
  selectTagsState,
  (state: TagsState): number => state.number
);
