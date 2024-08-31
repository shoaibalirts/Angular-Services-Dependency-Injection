import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  // private tasksService: TasksService;
  // shorter way of requesting a service:
  // 1. remove above line:   private tasksService: TasksService;
  // 2. write private in front of tService and replace tService to tasksService
  constructor(private tasksService: TasksService) {
    // constructor(tService: TasksService) {
    // tService is an instance of the TaskService provided by angular
    // this.tasksService = tService;
  }

  onAddTask(title: string, description: string) {
    // this.tasksService.addTask({ title: title, description: description });
    this.tasksService.addTask({ title, description }); // shorthand by JS, tsksService is from constructor

    this.formEl()?.nativeElement.reset();
  }
}
