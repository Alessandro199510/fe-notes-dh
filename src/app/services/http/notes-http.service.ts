import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageResponse} from '../../domain/responses/page.response';
import {Note} from '../../domain/models/note';
import {FindNotePayload} from '../../domain/payloads/find-note.payload';
import {KeysEnum} from '../../domain/enums/keys.enum';

@Injectable({
  providedIn: 'root'
})
export class NotesHttpService {

  private http: HttpClient = inject(HttpClient);
  private readonly API_URL: string;

  constructor() {
    this.API_URL = '/api/notes';
  }

  public getNotes(payload: FindNotePayload): Observable<PageResponse<Note>> {
    return this.http.get<PageResponse<Note>>(
      `${this.API_URL}?page=${payload.page}&size=${payload.size}&search_query=${payload.search_query}&status=${payload.status}&`,
      {headers: this.getHeaders()});
  }

  public saveNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.API_URL, note);
  }

  private getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem(KeysEnum.AUTH_TOKEN) || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
