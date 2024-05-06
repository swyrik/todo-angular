import { Component, OnDestroy, OnInit } from '@angular/core';
import Task from '../../Types/task.model'
import { TaskComponent } from "./task/task.component";
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-tasklist',
    standalone: true,
    templateUrl: './tasklist.component.html',
    styleUrl: './tasklist.component.scss',
    imports: [TaskComponent]
})
export class TasklistComponent implements OnInit, OnDestroy{
  tasks!: Task[];
  taskListId!: string;
  subs: Subscription[] = [];

  constructor(private taskService: TaskService){
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    const taskListSubscription = this.taskService.getTaskListSubject().subscribe((tasks) => {
      this.tasks = tasks.Tasks ?? [];
      this.taskListId = tasks.id;
    });
    this.subs.push(taskListSubscription);
  }

  deleteTask(id: String){
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

}
