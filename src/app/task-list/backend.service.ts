import { Injectable } from '@angular/core';
import { Task } from '../task-item/dto/task.dto';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  getTaskList(): Task[] {
    return [
      {
        id: 0.123456789,
        dateCreated: Date.now(),
        description: 'Помыть посуду',
        isCompleted: false
      },
      {
        id: 0.987654321,
        dateCreated: Date.now(),
        description: 'Помыть посуду',
        isCompleted: true
      }
    ]
  }
}
