import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import Task from '../../../Types/task.model';
import { JsonPipe } from '@angular/common';
import { TaskcontextmenuService } from '../../../services/taskcontextmenu.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {


  @Input() task!: Task;
  @ViewChild('taskContextMenu') taskContextMenuEle!: ElementRef<HTMLDivElement>;
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;

  constructor(private taskContextMenuService: TaskcontextmenuService){
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

  }

  taskComplete(checked: boolean) {
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

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.taskContextMenuEle.nativeElement.style.display = "none";
  }

  details($event: MouseEvent) {
  }

  taskContextMenuFun($event: MouseEvent) {
    this.taskContextMenuService.getContextMenuSubject().next("Task");
    $event.preventDefault();
    this.taskContextMenuEle.nativeElement.style.display = "block";
    this.taskContextMenuEle.nativeElement.style.position = "absolute";
    this.taskContextMenuEle.nativeElement.style.left = $event.pageX+"px";
    this.taskContextMenuEle.nativeElement.style.top = $event.pageY+"px";
  }

}
