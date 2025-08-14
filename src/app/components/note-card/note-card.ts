import {Component, Input} from '@angular/core';
import {Note} from '../../domain/models/note';
import {NoteTag} from '../note-tag/note-tag';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'note-card',
  imports: [
    NoteTag,
    DatePipe
  ],
  templateUrl: './note-card.html',
  styleUrl: './note-card.scss',
  standalone: true
})
export class NoteCard {

  @Input()
  public note: Note | undefined;

  constructor() {
    this.note = {} as Note;
  }
}
