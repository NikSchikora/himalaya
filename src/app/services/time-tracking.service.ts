import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { TimeTracking } from '../models/time-tracking';
import { Task } from '../models/task';
import { Duration } from '../models/duration';

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
    date: Date,
    duration: Duration,
    task: Task
  ): Promise<any> {
    const id = uuidv4();
    return this.timeTrackings.add({
      id,
      description,
      date,
      duration,
      taskId: task.id,
    });
  }

  save(timeTracking: TimeTracking) {
    this.timeTrackings.update(timeTracking.id, timeTracking);
  }

  remove(timeTracking: TimeTracking) {
    this.timeTrackings.delete(timeTracking.id);
  }

  getAll(): Promise<TimeTracking[]> {
    return this.timeTrackings
      .toCollection()
      .reverse()
      .sortBy('date')
      .then((items) =>
        items.map((item) => ({
          ...item,
          date: new Date(item.date),
          duration: {
            hours: Number(item.duration.hours),
            minutes: Number(item.duration.minutes),
          },
        }))
      );
  }
}
