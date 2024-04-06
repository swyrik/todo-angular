import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoPanelComponent } from "./todo-panel/todo-panel.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TodoPanelComponent, SidebarComponent]
})
export class AppComponent {
  title = 'todo';
}
