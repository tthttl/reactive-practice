import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from 'app/shared/model/user';

export const UNKNOWN_USER: User = {
  firstName: 'Unkown'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject: BehaviorSubject<User> = new BehaviorSubject(UNKNOWN_USER);

  user$: Observable<User> = this.subject.asObservable();

  constructor(
    private http: Http
  ) { }

  login(email: string, password: string): Observable<User> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/login', { email: email, password: password }, { headers: headers })
      .map(response => response.json())
      .do(user => this.subject.next(user))
      .publishLast().refCount();
  }
}
