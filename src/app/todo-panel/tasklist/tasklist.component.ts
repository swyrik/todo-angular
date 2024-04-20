import { Component, OnInit } from '@angular/core';
import Task from '../../Types/task.model'
import { TaskComponent } from "./task/task.component";
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-tasklist',
    standalone: true,
    templateUrl: './tasklist.component.html',
    styleUrl: './tasklist.component.scss',
    imports: [TaskComponent]
})
export class TasklistComponent implements OnInit{
  tasks!: Task[];
  taskListId!: string;

  constructor(private taskService: TaskService){
  }

  ngOnInit(): void {
    this.taskService.getTaskListSubject().subscribe((tasks) => {
      this.tasks=tasks.Tasks;
      this.taskListId = tasks.id;
    });
  }

  deleteTask(id: String){
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

}
