import { Component, HostListener, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-taskheader',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './taskheader.component.html',
  styleUrl: './taskheader.component.scss'
})
export class TaskheaderComponent implements OnInit{

  title: string = "no title";
  toggleHeaderRenameFlag: boolean = false;

  constructor(private taskService: TaskService){
  }

  ngOnInit(): void {
    this.taskService.getTaskListSubject().subscribe((tasks) => {this.title=tasks.name;});
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
      if(element.name == this.title){
        this.title = arg0;
        element.name = arg0;
      }
    });
    this.taskService.renderSidePanel();
  }

}
