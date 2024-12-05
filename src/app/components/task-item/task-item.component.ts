import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { Task } from './types/task.type';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  isEditMode: boolean = false;
  taskDescription: string = '';

  taskService = inject(TaskService);
  changeDetectorRef = inject(ChangeDetectorRef);

  @Input() task!: Task;

  @ViewChild('taskItemDescription')
  taskDescriptionElement!: ElementRef<HTMLDivElement>;

  @ViewChild('taskItemUpdateInput')
  taskItemUpdateInputElement!: ElementRef<HTMLInputElement>;

  completeTask() {
    this.task.isCompleted = !this.task.isCompleted;
  }

  setEditTaskMode() {
    this.isEditMode = true;

    this.taskDescription = this.task.description;

    this.changeDetectorRef.detectChanges();

    this.taskItemUpdateInputElement.nativeElement.focus();
  }

  updateTask() {
    const task = {
      ...this.task,
      description: this.taskDescription,
    };

    this.taskService.updateTask(task);

    this.isEditMode = false;
  }
}
