import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  id?: number;
  player_name: string;
  school: string;
  grad_year: string;
  position: string;
  season: string;
  roster_url: string;
  phone?: string;
  twitter?: string;
  instagram?: string;
  notes?: string;
  club_team?: string;
  gpa?: string;
  hudl?: string;
  maxpreps?: string;
  ncsa?: string;
  interest_ours?: number;
  interest_theirs?: number;
  contacted_date?: string;
  call_date?: string;
  offer_date?: string;
  visit_date?: string;
  targeted?: number;

  [key: string]: any;
}


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private API_URL = 'https://apex-api-0sxz.onrender.com/api/players';

  constructor(private http: HttpClient) {}

  getPlayers(filters?: {
    school?: string;
    grad_year?: string;
    position?: string;
    season?: string;
    player_name?: string;
  }): Observable<Player[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.school) params = params.set('school', filters.school);
      if (filters.grad_year) params = params.set('grad_year', filters.grad_year);
      if (filters.position) params = params.set('position', filters.position);
      if (filters.season) params = params.set('season', filters.season);
      if (filters.player_name) params = params.set('player_name', filters.player_name);
    }
    return this.http.get<Player[]>(this.API_URL, { params });
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.API_URL}/${id}`);
  }

  createPlayer(player: Player): Observable<any> {
    return this.http.post(this.API_URL, player);
  }

  updatePlayer(id: number, player: Player): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, player);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
