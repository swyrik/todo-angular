import { Component, Input } from '@angular/core';
import Task from '../../../Types/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  labelname!: string;
  @Input() task!: Task;

}
