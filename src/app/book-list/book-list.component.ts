import { Component } from '@angular/core';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  items = [
    {
      title: 'War and Peace',
      year: 1869,
      author: 'Leo Tolstoy',
      isDone: false,
    },
    {
      title: 'To Kill a Mockingbird',
      year: 1960,
      author: 'Harper Lee',
      isDone: false,
    },
  ];

  isDone(index: number): void {
    this.items[index].isDone = !this.items[index].isDone;
  }
}
