import {Component} from '@angular/core';
import {NotesList} from '../../components/notes-list/notes-list';
import {NoteForm} from '../../components/note-form/note-form';

@Component({
  selector: 'app-dashboard',
  imports: [NotesList, NoteForm],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  constructor() {
  }

}
