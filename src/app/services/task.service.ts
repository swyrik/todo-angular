import { Injectable } from '@angular/core';
import TaskList from '../Types/tasklist.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasklistitems: TaskList[] = [];
  private taskListSubject = new Subject<TaskList>();

  renderTaskList(taskList: TaskList){
    this.taskListSubject.next(taskList);
  }

  getTaskListSubject(){
    return this.taskListSubject
  }

  constructor() { }

  addNewTaskList(newTaskList: TaskList) {
    this.tasklistitems.push(newTaskList);
  }

  deleteTaskList(index: number) {
    this.tasklistitems.splice(index, 1);
  }

  addTaskInTaskList(){

  }

  removeTaskInTaskList(){

  }
}
