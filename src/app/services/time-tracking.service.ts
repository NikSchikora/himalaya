import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { TimeTracking } from '../models/time-tracking';
import { Task } from '../models/task';

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
      taskId: task.id,
    });
  }

  save(timeTracking: TimeTracking) {
    this.timeTrackings.update(timeTracking.id, timeTracking);
  }

  getAll(): Promise<TimeTracking[]> {
    return this.timeTrackings
      .toCollection()
      .reverse()
      .sortBy('endDate')
      .then((items) =>
        items.map((item) => ({
          ...item,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
        }))
      );
  }
}
