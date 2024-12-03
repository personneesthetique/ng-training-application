import { Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task-item/dto/task.dto';
import { TaskItemComponent } from '../task-item/task-item.component';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private backend = inject(BackendService)

  constructor(
    private elementRef: ElementRef,
  ) {}

  public taskList: Task[] = this.backend.getTaskList();

  removeTask(taskData: Task) {
    const index = this.taskList.findIndex((task) => task.id === taskData.id);

    if (index !== -1) {
      this.taskList.splice(index, 1);
    }
  }

  addTask() {
    const input: HTMLInputElement = this.elementRef.nativeElement.querySelector(
      '.task-list__add-task-input'
    );

    const task: Task = {
      id: Math.random(),
      dateCreated: Date.now(),
      description: '',
      isCompleted: false,
    };

    task.description = input.value;
    input.value = ''

    this.taskList.push(task);
  }
}
