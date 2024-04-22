import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import Task from '../../Types/task.model';
import TaskList from '../../Types/tasklist.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-addtask',
  standalone: true,
  imports: [],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.scss'
})
export class AddtaskComponent {

  toggleAddTaskFlag : boolean = false;
  @ViewChild('newtask', { static: false }) newTaskInput!: ElementRef;
  taskList!: TaskList;

  constructor(private taskService: TaskService){
  }

  ngOnInit(): void {
    this.taskService.getTaskListSubject().subscribe((tasks) => {this.taskList=tasks;});
  }

  toggleAddTask(event: any){
    if(this.taskList.Tasks.length === 0 && this.taskList.id == "") return;
    this.toggleAddTaskFlag = true;
    this.newTaskInput!.nativeElement.focus();
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.toggleAddTaskFlag = false;
  }

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if(this.toggleAddTaskFlag && this.newTaskInput.nativeElement.value){
      this.toggleAddTaskFlag = false;
      this.taskList.Tasks.push({name: this.newTaskInput.nativeElement.value, done: false, id: uuidv4()});
    }
  }


}
