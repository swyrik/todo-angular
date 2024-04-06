import { Component } from '@angular/core';
import Task from '../../Types/task.model'
import { TaskComponent } from "./task/task.component";

@Component({
    selector: 'app-tasklist',
    standalone: true,
    templateUrl: './tasklist.component.html',
    styleUrl: './tasklist.component.scss',
    imports: [TaskComponent]
})
export class TasklistComponent {
  tasks: Task[] = [{
    id: 1, name: "Buy groceries", done: true
  }, {
    id: 2, name: "Clean the house", done: false
  },
  {
    id: 3, name: "compute" , done:true
  },
  {
    id: 1, name: "Buy groceries", done: false
  }, {
    id: 2, name: "Clean the house", done: false
  },
  {
    id: 3, name: "compute" , done:true
  }
];

}
