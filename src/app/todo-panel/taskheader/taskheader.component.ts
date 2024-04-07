import { Component, OnInit } from '@angular/core';
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

  constructor(private taskService: TaskService){
  }

  ngOnInit(): void {
    this.taskService.getTaskListSubject().subscribe((tasks) => {this.title=tasks.name;});
  }

}
