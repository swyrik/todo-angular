import { Component, Input } from '@angular/core';
import Task from '../../../Types/task.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() task!: Task;

}
