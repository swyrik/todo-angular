import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import TaskList from '../../../Types/tasklist.model';
import { TitleCasePipe } from '@angular/common';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-tasklist-item',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './tasklist-item.component.html',
  styleUrl: './tasklist-item.component.scss'
})

export class TasklistItemComponent {

  @Input() tasklist!: TaskList;
  @Input() index!: number;
  @ViewChild('tasklistitem', { static: false }) taskListItem!: ElementRef;
  @Output() clicked = new EventEmitter<number>();
  @Input() activeClass! : any;

  constructor(private taskService: TaskService){

  }

  displayTaskListItem(arg0: TaskList) {
    this.taskService.renderTaskList(arg0);
    this.clicked.emit(this.index);
  }

}
