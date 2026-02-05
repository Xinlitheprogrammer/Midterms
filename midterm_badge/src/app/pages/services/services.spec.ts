import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Services } from '../services/services'; // correct path
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { DataService, Post } from '../services/data.services';
import { of } from 'rxjs';

describe('Services', () => {
  let component: Services;
  let fixture: ComponentFixture<Services>;
  let mockDataService: Partial<DataService>;

  beforeEach(async () => {
    mockDataService = {
      posts$: of([{ id: 1, title: 'Test Post', body: 'Test body' } as Post])
    };

    await TestBed.configureTestingModule({
      imports: [Services, CommonModule, HttpClientTestingModule, TruncatePipe],
      providers: [{ provide: DataService, useValue: mockDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(Services);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have posts from mock service', (done) => {
    component.posts$.subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts[0].title).toBe('Test Post');
    });
  });
});
