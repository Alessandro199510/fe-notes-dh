import {Component, Input} from '@angular/core';
import {Note} from '../../domain/models/note';
import {NoteTag} from '../note-tag/note-tag';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'no-select-note',
  templateUrl: './no-select-note.html',
  styleUrl: './no-select-note.scss',
  standalone: true
})
export class NoSelectNote {

  @Input()
  public note: Note | undefined;

  constructor() {
    this.note = {} as Note;
  }
}
