import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { Task } from './dto/task.dto';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @Input() taskData: Task = {
    id: undefined,
    dateCreated: undefined,
    description: '',
    isCompleted: false,
  };

  @Output() taskRemoved = new EventEmitter<Task>();

  completeTask() {
    this.taskData.isCompleted = !this.taskData.isCompleted;
  }

  removeTask() {
    this.taskRemoved.emit(this.taskData);
  }

  updateTask() {
    const taskItemContainer: HTMLElement =
      this.elementRef.nativeElement.querySelector('.task-item__description');
    const input: HTMLInputElement = this.renderer.createElement('input');

    taskItemContainer.innerHTML = '';
    this.renderer.appendChild(taskItemContainer, input);
    input.value = this.taskData.description;
    input.focus();

    input.addEventListener('blur', () => {
      this.taskData.description = input.value;
      taskItemContainer.innerHTML = this.taskData.description;
    });
  }
}
