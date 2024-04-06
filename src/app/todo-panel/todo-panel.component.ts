import { Component } from '@angular/core';
import { TaskheaderComponent } from "./taskheader/taskheader.component";
import { TasklistComponent } from "./tasklist/tasklist.component";
import { AddtaskComponent } from "./addtask/addtask.component";

@Component({
    selector: 'app-todo-panel',
    standalone: true,
    templateUrl: './todo-panel.component.html',
    styleUrl: './todo-panel.component.scss',
    imports: [TaskheaderComponent, TasklistComponent, AddtaskComponent]
})
export class TodoPanelComponent {

}
