import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private loggingService = inject(LoggingService);
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly(); // we want to protect it to change the data from outside (component)
  // service # 1
  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('Added Task service with title: ' + taskData.title);
  }
  // service # 2
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update(
      (oldTasks) =>
        oldTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      // if id found then ...task is the old task to be updated to a new status, else no change
    );
    this.loggingService.log('Change Task status to: ' + newStatus);
  }
} // end of service class
