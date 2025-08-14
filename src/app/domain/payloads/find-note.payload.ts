import {NotesStatus} from '../enums/notes-status.enum';

export interface FindNotePayload {
  page: number;
  size: number;
  search_query?: string;
  status?: NotesStatus;
}
