import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import TaskList from '../../Types/tasklist.model';
import { TasklistItemComponent } from "./tasklist-item/tasklist-item.component";
import { TaskService } from '../../services/task.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-tasklist-items',
    standalone: true,
    templateUrl: './tasklist-items.component.html',
    styleUrl: './tasklist-items.component.scss',
    imports: [TasklistItemComponent]
})
export class TasklistItemsComponent  implements OnInit, AfterViewInit{

    tasklistitems: TaskList[] = [
      {
        id: uuidv4(),
        name: 'learning goals 2024',
        Tasks: [
          {
            name: 'Task 1 24',
            done: false,
            id: uuidv4()
          },
          {
            name: 'Task 2 24',
            done: false,
            id: uuidv4()
          },
          {
            name: 'Task 3 24',
            done: false,
            id: uuidv4()
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'learning goals 2023',
        Tasks: [
          {
            name: 'Task 1',
            done: false,
            id: uuidv4()
          },
          {
            name: 'Task 2',
            done: false,
            id: uuidv4()
          },
          {
            name: 'Task 3',
            done: false,
            id: uuidv4()
          },
        ],
      }
    ];

  activeItem! : number;
  @ViewChildren(TasklistItemComponent) taskListItemsComponent!: QueryList<any>;


  constructor(private taskService: TaskService, private eleRef: ElementRef){
    this.taskService
    .getRenderSidePanelSubject()
    .subscribe(taskListItems => {
      this.tasklistitems = taskListItems;
      console.log("render");
    });
  }

  ngOnInit(): void {
    this.taskService.setTaskListItems(this.tasklistitems);
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.taskListItemsComponent.forEach((item : TasklistItemComponent, index:number) => {
        if(index == 0) {
          let firstItem = this.eleRef.nativeElement.querySelector(`.tasklist-item-${index}`);
          firstItem.dispatchEvent(new Event('click'));
        }
      });
      console.log("queue invoke")
    })
  }


  onClicked($event: number) {
    this.activeItem = $event;
  }


}
