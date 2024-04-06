import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-taskheader',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './taskheader.component.html',
  styleUrl: './taskheader.component.scss'
})
export class TaskheaderComponent {

  title: string = "no title";

}
