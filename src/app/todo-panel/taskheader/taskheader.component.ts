import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-taskheader',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './taskheader.component.html',
  styleUrl: './taskheader.component.scss'
})
export class TaskheaderComponent implements OnInit, OnDestroy{

  title: string = "no title";
  id!: string;
  toggleHeaderRenameFlag: boolean = false;
  subs: Subscription[] = [];

  constructor(private taskService: TaskService){
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    const taskListSubscription = this.taskService.getTaskListSubject().subscribe((tasks) => {
      this.title=tasks.name;
      this.id = tasks.id;
    });
    this.subs.push(taskListSubscription);
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.toggleHeaderRenameFlag = false;
  }

  renameHeader($event: MouseEvent) {
    this.toggleHeaderRenameFlag = true;
  }

  /**
   * not working at the moment
   * @param arg0
   */
  updateTitle(arg0: string) {
    this.taskService.tasklistitems.forEach(element => {
      if(element.id == this.id){
        this.title = arg0;
        element.name = arg0;
      }
    });
    this.taskService.renderSidePanel();
  }

}
