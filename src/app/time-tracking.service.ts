import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { TimeTracking } from './time-tracking';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackingService extends Dexie {
  timeTrackings: Dexie.Table<TimeTracking, string>;

  constructor() {
    super('TimeTrackingDatabase');

    this.version(1).stores({
      timeTrackings: 'id',
    });
  }

  add(
    description = '',
    startDate: Date,
    endDate: Date,
    task: Task
  ): Promise<any> {
    const id = uuidv4();
    return this.timeTrackings.add({
      id,
      description,
      startDate,
      endDate,
      task: task.id,
    });
  }

  getAll(): Promise<TimeTracking[]> {
    return this.timeTrackings.toCollection().reverse().sortBy('endDate');
  }
}
