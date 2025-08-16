import {PaginationEnum} from '../enums/pagination.enum';

export interface FindTagPayload {
  page: number;
  size: number;
  search_query?: string;
}

export const defaultLoadTagPayload: FindTagPayload = {
  page: PaginationEnum.INITIAL_PAGE,
  size: PaginationEnum.PAGE_SIZE,
  search_query: '',
}
