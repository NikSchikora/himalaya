import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends Dexie {
  tasks: Dexie.Table<Task, string>;

  constructor() {
    super('TaskDatabase');

    this.version(1).stores({
      tasks: 'id',
    });
  }

  add(title: string, description = ''): Promise<any> {
    const id = uuidv4();
    return this.tasks.add({
      id,
      title,
      description,
      isLiked: false,
    });
  }

  toggleLikeStatus(task: Task): void {
    const updatedTask: Task = { ...task, isLiked: !task.isLiked };
    this.save(updatedTask);
  }

  save(task: Task) {
    this.tasks.update(task.id, task);
  }

  getAll(): Promise<Task[]> {
    return this.tasks.toCollection().reverse().sortBy('title');
  }
}
