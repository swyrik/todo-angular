import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import TaskList from '../../Types/tasklist.model';
import { TasklistItemComponent } from "./tasklist-item/tasklist-item.component";
import { TaskService } from '../../services/task.service';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-tasklist-items',
    standalone: true,
    templateUrl: './tasklist-items.component.html',
    styleUrl: './tasklist-items.component.scss',
    imports: [TasklistItemComponent]
})
export class TasklistItemsComponent  implements OnInit, AfterViewInit, OnDestroy{

    tasklistitems: TaskList[] = [
      {
        id: uuidv4(),
        name: 'learning goals 2024',
        Tasks: [
          {
            name: 'Task 1 24',
            done: false,
            important: false,
            id: uuidv4(),
            date: new Date()
          },
          {
            name: 'Task 2 24',
            done: false,
            important: false,
            id: uuidv4(),
            date: new Date()
          },
          {
            name: 'Task 3 24',
            done: false,
            important: false,
            id: uuidv4(),
            date: new Date()
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
            important: false,
            id: uuidv4(),
            date: new Date()
          },
          {
            name: 'Task 2',
            done: false,
            important: false,
            id: uuidv4(),
            date: new Date()
          },
          {
            name: 'Task 3',
            done: false,
            important: false,
            id: uuidv4(),
            date: new Date()
          },
        ],
      }
    ];

  activeItem! : number;
  @ViewChildren(TasklistItemComponent) taskListItemsComponent!: QueryList<any>;

  subs: Subscription[] = [];


  constructor(private taskService: TaskService, private eleRef: ElementRef){
    const renderSidePanleSubscription = this.taskService
    .getRenderSidePanelSubject()
    .subscribe(taskListItems => {
      this.tasklistitems = taskListItems;
      this.taskService.setTaskListItems(this.tasklistitems);
    });
    this.subs.push(renderSidePanleSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    this.taskService.setTaskListItems(this.tasklistitems);
  }

  ngAfterViewInit(): void {
      this.renderFirstItem();
  }


  activeItemDeleted() {
    this.renderFirstItem();
  }

  renderFirstItem() {
    if(this.tasklistitems.length == 0) return;
    queueMicrotask(() => {
      this.taskListItemsComponent.forEach((item: TasklistItemComponent, index: number) => {
        if (index == 0) {
          let firstItem = this.eleRef.nativeElement.querySelector(`.tasklist-item-${index}`);
          firstItem.dispatchEvent(new Event('click'));
        }
      });
    });
  }

  onClicked($event: number) {
    this.activeItem = $event;
  }


}
