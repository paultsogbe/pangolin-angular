import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Pangolin } from './models/pangolin';

@Injectable({
  providedIn: 'root',
})
export class PangolinService {
  baseUrl = 'https://pangolin-api-paul.herokuapp.com/api/v1/pangolins';
  private pangolinCreated = new Subject<string>();
  uploadedImage = '';

  constructor(private httpClient: HttpClient) {}

  createPangolin(post: Pangolin) {
    return this.httpClient.post<Pangolin>(this.baseUrl, post);
  }

  uploadImage(formData: FormData) {
    return this.httpClient.post<any>(`${this.baseUrl}/images`, formData);
  }

  dispatchPangolinCreated(id: string) {
    this.pangolinCreated.next(id);
  }

  handlePangolinCreated() {
    return this.pangolinCreated.asObservable();
  }

  getPangolins(): Observable<Pangolin[]> {
    return this.httpClient.get<Pangolin[]>(`${this.baseUrl}/`);
  }

  getPangolinById(id: string): Observable<Pangolin> {
    return this.httpClient.get<Pangolin>(`${this.baseUrl}/${id}`);
  }

  updatePangolin(id: string, pangolin: Pangolin) {
    return this.httpClient.put(`${this.baseUrl}/${id}`, pangolin);
  }

  deleteSinglePangolin(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  deletePangolins(ids: string[]) {
    const allIds = ids.join(',');
    return this.httpClient.delete(`${this.baseUrl}/?ids=${allIds}`);
  }
}

