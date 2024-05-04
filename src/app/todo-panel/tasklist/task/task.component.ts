import { Component, ElementRef, HostListener, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import Task from '../../../Types/task.model';
import { JsonPipe } from '@angular/common';
import { TaskcontextmenuService } from '../../../services/taskcontextmenu.service';
import { TaskService } from '../../../services/task.service';



@Component({
  selector: 'app-task',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() task!: Task;
  @Input() taskListId!: String;
  @Output() deleteTaskId = new EventEmitter<String>();
  @ViewChild('taskContextMenu') taskContextMenuEle!: ElementRef<HTMLDivElement>;
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;
  @ViewChild('taskInputImportant') taskInputImportant!: ElementRef<HTMLInputElement>;

  constructor(private taskContextMenuService: TaskcontextmenuService,
    private taskService: TaskService
  ){
    this.taskContextMenuService.getContextMenuSubject().subscribe(() => {
      this.closeTaskContextMenu();
    });
  }

  closeTaskContextMenu() {
    if(this.taskContextMenuEle.nativeElement.style.display == "block"){
      this.taskContextMenuEle.nativeElement.style.display  ="none";
    }
  }

  deleteTask() {
    this.closeTaskContextMenu();
    this.taskService.deleteTaskInTaskList(this.task.id, this.taskListId);
    this.deleteTaskId.emit(this.task.id);
  }

  menuTaskComplete(checked: boolean) {
    this.closeTaskContextMenu();
    this.taskInput.nativeElement.checked = !checked;
    this.task.done = !checked;
  }

  taskDone($event: any) {
    if($event?.target?.checked){
      this.task.done = true;
    } else {
      this.task.done = false;
    }
  }

  menuTaskImportant(checked: boolean) {
    this.closeTaskContextMenu();
    this.taskInput.nativeElement.checked = !checked;
    this.task.important = !checked;
  }

  taskImportant($event: any) {
    if($event?.target?.checked){
      this.task.important = true;
    } else {
      this.task.important = false;
    }
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.taskContextMenuEle.nativeElement.style.display = "none";
  }

  taskContextMenuFun($event: MouseEvent) {
    this.taskContextMenuService.getContextMenuSubject().next("Task");
    $event.preventDefault();
    this.taskContextMenuEle.nativeElement.style.display = "block";
    this.taskContextMenuEle.nativeElement.style.position = "absolute";
    this.taskContextMenuEle.nativeElement.style.left = $event.pageX+"px";
    this.taskContextMenuEle.nativeElement.style.top = $event.pageY+"px";
  }

  showTaskDetails($event: any) {
    if($event.target.classList.contains("done") || $event.target.classList.contains("important") ) return;
    this.taskService.getShowTaskDetailsSubject().next({task :this.task, action: "show"} );
  }

}
