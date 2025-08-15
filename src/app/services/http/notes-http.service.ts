import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    let params = new HttpParams();

    if (payload.page != null) {
      params = params.set('page', payload.page.toString());
    }
    if (payload.size != null) {
      params = params.set('size', payload.size.toString());
    }
    if (payload.search_query) {
      params = params.set('search_query', payload.search_query);
    }
    if (payload.status) {
      params = params.set('status', payload.status);
    }

    return this.http.get<PageResponse<Note>>(this.API_URL, {
      headers: this.getHeaders(),
      params: params
    });
  }

  public saveNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.API_URL, note, {headers: this.getHeaders()});
  }

  public updateNote(note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.API_URL}/${note.id}`, note, {headers: this.getHeaders()});
  }

  private getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem(KeysEnum.AUTH_TOKEN) || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
