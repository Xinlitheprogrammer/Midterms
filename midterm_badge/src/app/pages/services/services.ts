import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { DataService, Post } from '../services/data.services';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { TruncatePipe } from '../../pipes/truncate-pipe'; // fixed import

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TruncatePipe],
  templateUrl: './services.html', // fixed closing quote
  styleUrls: ['./services.css']
})
export class Services {
  search = new FormControl('');
  posts$: Observable<Post[]>;          // raw posts from service
  filteredPosts$: Observable<Post[]>;  // filtered posts

  constructor(private data: DataService) {
    this.posts$ = this.data.posts$;

    // Combine search input with posts to filter dynamically
    this.filteredPosts$ = combineLatest([
      this.posts$,
      this.search.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([posts, searchTerm]) => {
        const term = (searchTerm || '').toLowerCase(); // safe fallback
        return posts.filter(p =>
          p.title.toLowerCase().includes(term) ||
          p.body.toLowerCase().includes(term)
        );
      })
    );
  }
}
