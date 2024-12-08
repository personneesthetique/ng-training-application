import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../task-item/types/task.type';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  public taskService = inject(TaskService);

  taskInputValue: string = '';

  addTask() {
    const task: Task = {
      id: Date.now(),
      dateCreated: Date.now(),
      description: this.taskInputValue,
      isCompleted: false,
    };

    this.taskService.addTask(task);

    this.taskInputValue = '';
  }
}
