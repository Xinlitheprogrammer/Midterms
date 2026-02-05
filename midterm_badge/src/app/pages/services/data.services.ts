import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators'; // make sure you import from 'rxjs/operators' if needed

// Interface for API posts
export interface Post {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root' // singleton service
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Observable of posts with caching (shareReplay)
  posts$: Observable<Post[]>;

  constructor(private http: HttpClient) {
    // Initialize posts$ here instead of inline property
    this.posts$ = this.http.get<Post[]>(this.apiUrl).pipe(
      shareReplay(1) // caches the result so multiple subscribers don't trigger extra HTTP calls
    );
  }
}
