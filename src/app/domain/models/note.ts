import {NotesStatus} from '../enums/notes-status.enum';

export interface Note {
  id: number;
  title: string;
  content: string;
  status: NotesStatus;
  createdAt: Date;
  updatedAt: Date;
  user: string;
  tags: string[];
}
