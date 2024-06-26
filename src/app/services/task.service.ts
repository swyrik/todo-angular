import { Injectable } from '@angular/core';
import TaskList from '../Types/tasklist.model';
import { BehaviorSubject, Subject } from 'rxjs';
import Task from '../Types/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasklistitems: TaskList[] = [];
  private taskListSubject = new Subject<TaskList>();
  private hideTodoDetail = new Subject<String>();
  private addTaskInTaskListSubject = new Subject<Task>();
  private renderSidePanelSubject = new  Subject<TaskList[]>();
  private showTaskDetailsSubject = new Subject<{task : Task, action: string}>();

  setTaskListItems(tasklistitems: TaskList[]){
    this.tasklistitems = tasklistitems;
  }

  renderTaskList(taskList: TaskList){
    this.taskListSubject.next(taskList);
  }

  getHideTodoDetail() {
    return this.hideTodoDetail;
  }

  getAddTaskInTaskListSubject(){
    return this.addTaskInTaskListSubject;
  }

  getTaskListSubject(){
    return this.taskListSubject
  }

  renderSidePanel(){
    return this.renderSidePanelSubject.next(this.tasklistitems);
  }

  getRenderSidePanelSubject(){
    return this.renderSidePanelSubject;
  }

  constructor() { }

  addNewTaskList(newTaskList: TaskList) {
    this.tasklistitems.push(newTaskList);
  }

  deleteTaskList(id: String) {
    this.tasklistitems = this.tasklistitems.filter(taskList => taskList.id != id);
    this.renderSidePanelSubject.next(this.tasklistitems);
    if(this.tasklistitems.length == 0){
      console.log("last one");
      this.renderTaskList({
        name: "",
        id: "",
        Tasks: []
      });
    }
  }

  addTaskInTaskList(){

  }

  deleteTaskInTaskList(id: String, taskListId?: String) {
    for(let i = 0; i< this.tasklistitems.length; i++){
      if(this.tasklistitems[i].id == taskListId){
        this.tasklistitems[i].Tasks = this.tasklistitems[i].Tasks.filter(task => {
          if (task.id !== id) {
            return  true;
          }
          return false;
        })
        break;
      } else {
        this.tasklistitems[i].Tasks = this.tasklistitems[i].Tasks.filter(task => {
          if (task.id !== id) {
            return  true;
          }
          return false;
        });
      }
    }
    return this.renderSidePanelSubject.next(this.tasklistitems);
  }

  getShowTaskDetailsSubject(){
    return this.showTaskDetailsSubject;
  }
}
