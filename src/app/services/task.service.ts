import { Injectable } from '@angular/core';
import { TaskDto } from '../components/task-item/dto/task.dto';
import { Task } from '../components/task-item/types/task.type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  private tasks$ = new BehaviorSubject(this.tasks);

  getTasks(): Observable<TaskDto[]> {
    return this.tasks$.asObservable();
  }

  addTask(task: Task) {
    const tasks = this.tasks$.value;

    tasks.push(task);

    this.tasks$.next(tasks);
  }

  updateTask(task: Task) {
    const tasks = this.tasks$.value;

    const updatedTasks = tasks.map((taskItem) => {
      if (taskItem.id === task.id) {
        return task;
      }

      return taskItem;
    });

    this.tasks$.next(updatedTasks);
  }

  deleteTask(id: number) {
    const tasks = this.tasks$.value;

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);

      this.tasks$.next(tasks);

      return;
    }
  }
}
