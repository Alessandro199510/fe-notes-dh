import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NotesList} from '../../components/notes-list/notes-list';
import {NoteForm} from '../../components/note-form/note-form';
import {SessionService} from '../../services/local/session.service';
import {NoSelectNote} from '../../components/no-select-note/no-select-note';
import {Note} from '../../domain/models/note';
import {SearchNotes} from '../../components/search-notes/search-notes';

@Component({
  selector: 'app-dashboard',
  imports: [NotesList, NoteForm, NoSelectNote, SearchNotes],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {

  private sessionService: SessionService = inject(SessionService);

  public showNoteData: boolean;
  public selectedNote: Note | null;

  constructor() {
    this.showNoteData = false;
    this.selectedNote = null;
  }

  public logout(): void {
    this.sessionService.logout();
  }

  public hideNoteData(): void {
    this.showNoteData = false;
  }

  public showForm(note: Note | null): void {
    this.showNoteData = true;
    this.selectedNote = note;
  }
}
