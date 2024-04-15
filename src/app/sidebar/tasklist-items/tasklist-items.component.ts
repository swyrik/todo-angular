import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
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
export class TasklistItemsComponent  implements OnInit, AfterViewInit{

  activeItem! : number;
  @ViewChildren(TasklistItemComponent) taskListItems!: QueryList<any>;

  constructor(private taskService: TaskService, private eleRef: ElementRef){

  }
  ngOnInit(): void {

  }

  tasklistitems: TaskList[] = [
    {
      name: 'learning goals 2024',
      Tasks: [
        {
          name: 'Task 1 24',
          done: false,
        },
        {
          name: 'Task 2 24',
          done: false,
        },
        {
          name: 'Task 3 24',
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

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.taskListItems.forEach((item : TasklistItemComponent, index:number) => {
        if(index == 0) {
          let firstItem = this.eleRef.nativeElement.querySelector(`.tasklist-item-${index}`);
          firstItem.dispatchEvent(new Event('click'));
        }
      });
    })
  }


  onClicked($event: number) {
    this.activeItem = $event;
  }


}
