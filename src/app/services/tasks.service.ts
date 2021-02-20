import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService extends Dexie {
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

  // TODO save()

  getAll(): Promise<Task[]> {
    return this.tasks.toCollection().reverse().sortBy('title');
  }
}
