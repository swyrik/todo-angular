import { Component } from '@angular/core';
import TaskList from '../../Types/tasklist.model';
import { TasklistItemComponent } from "./tasklist-item/tasklist-item.component";
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-tasklist-items',
    standalone: true,
    templateUrl: './tasklist-items.component.html',
    styleUrl: './tasklist-items.component.scss',
    imports: [TasklistItemComponent]
})
export class TasklistItemsComponent {

  activeItem! : number;

  constructor(private taskService: TaskService){

  }

  tasklistitems: TaskList[] = [
    {
      name: 'learning goals 2024',
      Tasks: [
        {
          name: 'Task 1',
          done: false,
        },
        {
          name: 'Task 2',
          done: false,
        },
        {
          name: 'Task 3',
          done: false,
        },
      ],
    },
    {
      name: 'learning goals 2023',
      Tasks: [
        {
          name: 'Task 1',
          done: false,
        },
        {
          name: 'Task 2',
          done: false,
        },
        {
          name: 'Task 3',
          done: false,
        },
      ],
    }
  ];

  onClicked($event: number) {
    this.activeItem = $event;
  }


}
