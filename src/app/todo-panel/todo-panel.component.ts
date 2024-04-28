import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaskheaderComponent } from "./taskheader/taskheader.component";
import { TasklistComponent } from "./tasklist/tasklist.component";
import { AddtaskComponent } from "./addtask/addtask.component";
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TaskService } from '../services/task.service';
import Task from '../Types/task.model';

@Component({
    selector: 'app-todo-panel',
    standalone: true,
    templateUrl: './todo-panel.component.html',
    styleUrl: './todo-panel.component.scss',
    imports: [TaskheaderComponent, TasklistComponent, AddtaskComponent, TodoDetailComponent]
})
export class TodoPanelComponent {

  @ViewChild('todoDetail') taskInput!: ElementRef<HTMLDivElement>;
  todoDetailClass:string = "todo-detail";
  task!: Task;

  constructor(private taskService: TaskService){
    this.taskService.getShowTaskDetailsSubject().subscribe(task => {
      if(task.id == "") {
        this.todoDetailClass = "todo-detail";
      } else{
        this.todoDetailClass = "todo-detail active";
        this.task = task;
      }
    });
  }

}
