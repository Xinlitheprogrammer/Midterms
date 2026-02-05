import { Component } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, DatePipe, UpperCasePipe],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {
  today: Date = new Date(); // For DatePipe
}
