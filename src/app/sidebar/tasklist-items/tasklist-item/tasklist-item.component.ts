import { Component, ElementRef, Input, Output, ViewChild, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import TaskList from '../../../Types/tasklist.model';
import { TitleCasePipe } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { TaskcontextmenuService } from '../../../services/taskcontextmenu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasklist-item',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './tasklist-item.component.html',
  styleUrl: './tasklist-item.component.scss'
})

export class TasklistItemComponent implements OnDestroy{

  @Input() tasklist!: TaskList;
  @Input() index!: number;
  @ViewChild('tasklistitem', { static: false }) taskListItem!: ElementRef;
  @ViewChild('taskListContextMenu') taskListContextMenuEle!: ElementRef<HTMLDivElement>
  @Output() clicked = new EventEmitter<number>();
  @Output() activeItemDeleted = new EventEmitter<number>();
  @Input() activeClass! : any;
  subs: Subscription[] = [];

  constructor(private taskContextMenuService: TaskcontextmenuService,
    private taskService: TaskService
  ){
    const contextMenuSubscription = this.taskContextMenuService.getContextMenuSubject().subscribe(() => {
      this.closeTaskListContextMenu();
    });
    this.subs.push(contextMenuSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  displayTaskListItem(arg0: TaskList) {
    this.taskService.renderTaskList(arg0);
    this.clicked.emit(this.index);
  }

  taskListContextMenuFn($event: MouseEvent) {
    this.taskContextMenuService.getContextMenuSubject().next("tasklist");
    $event.preventDefault();
    this.taskListContextMenuEle.nativeElement.style.display = "block";
    this.taskListContextMenuEle.nativeElement.style.position = "absolute";
    this.taskListContextMenuEle.nativeElement.style.left = $event.pageX+"px";
    this.taskListContextMenuEle.nativeElement.style.top = $event.pageY+"px";
  }

  closeTaskListContextMenu() {
    if(this.taskListContextMenuEle.nativeElement.style.display == "block"){
      this.taskListContextMenuEle.nativeElement.style.display  ="none";
    }
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.closeTaskListContextMenu();
  }

  deleteTaskList($event: MouseEvent) {
    this.closeTaskListContextMenu();
    this.taskService.deleteTaskList(this.tasklist.id);
    if(this.taskListItem.nativeElement.classList.contains("active")) {
      this.activeItemDeleted.emit(this.taskListItem.nativeElement.id);
    }
    $event.preventDefault();
    $event.stopPropagation();
  }

}
