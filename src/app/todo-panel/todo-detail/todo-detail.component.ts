import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Task from '../../Types/task.model';
import { DatePipe, JsonPipe } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [ DatePipe],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent {

  @Input()
  public task!: Task;

  @ViewChild('todo-detail')
  todoDetail!: ElementRef<HTMLDivElement>;

  constructor(private taskService: TaskService) {}

  closeTodoDetail($event: MouseEvent) {
    this.taskService.getShowTaskDetailsSubject().next({name:"", id: "", done:false, important: false,  date: new Date()});
  }

}
