import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Tag} from '../../domain/models/tag';

export interface TagsState extends EntityState<Tag> {
  number: number,
  size: number,
  totalElements: number,
  totalPages: number,
  loading: boolean;
  error: any | null;
}


export const tagsAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>({
  selectId: (tag: Tag): number => tag.id,
  sortComparer: (left: Tag, right: Tag) => right.id - left.id,
});

export const initialTagsState: TagsState = tagsAdapter.getInitialState({
  number: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  loading: false,
  error: null,
});
