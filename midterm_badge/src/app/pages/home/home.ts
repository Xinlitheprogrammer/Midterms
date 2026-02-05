import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { DataService, Post } from '../services/data.services';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  latestPosts$: Observable<Post[]>;

  constructor(private data: DataService) {
    this.latestPosts$ = this.data.posts$.pipe(
      map((posts: Post[]) => posts.slice(0, 5))
    );
  }
}
