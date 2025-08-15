import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageResponse} from '../../domain/responses/page.response';
import {Tag} from '../../domain/models/tag';
import {FindTagPayload} from '../../domain/payloads/find-tag.payload';
import {KeysEnum} from '../../domain/enums/keys.enum';

@Injectable({
  providedIn: 'root'
})
export class TagsHttpService {

  private http: HttpClient = inject(HttpClient);
  private readonly API_URL: string;

  constructor() {
    this.API_URL = '/api/tags';
  }

  public getTags(payload: FindTagPayload): Observable<PageResponse<Tag>> {
    return this.http.get<PageResponse<Tag>>(
      `${this.API_URL}?page=${payload.page}&size=${payload.size}&search_query=${payload.search_query}`,
      {headers: this.getHeaders()});
  }

  public saveTag(tag: Partial<Tag>): Observable<Tag> {
    return this.http.post<Tag>(this.API_URL, tag, {headers: this.getHeaders()});
  }

  public updateTag(tag: Partial<Tag>): Observable<Tag> {
    return this.http.put<Tag>(`${this.API_URL}/${tag.id}`, tag, {headers: this.getHeaders()});
  }

  private getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem(KeysEnum.AUTH_TOKEN) || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
