import {Component, Input} from '@angular/core';

@Component({
  selector: 'note-tag',
  imports: [],
  templateUrl: './note-tag.html',
  styleUrl: './note-tag.scss',
  standalone: true
})
export class NoteTag {
  @Input()
  public tag: string;
  constructor() {
    this.tag = '';
  }
}
