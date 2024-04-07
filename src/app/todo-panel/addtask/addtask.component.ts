import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import Task from '../../Types/task.model';
import TaskList from '../../Types/tasklist.model';

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
      this.taskList.Tasks.push({name: this.newTaskInput.nativeElement.value, done: false});
    }
  }


}
