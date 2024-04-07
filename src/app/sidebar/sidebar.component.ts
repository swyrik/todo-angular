import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { NewlistComponent } from './newlist/newlist.component';
import { TasklistItemsComponent } from "./tasklist-items/tasklist-items.component";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [SearchComponent, NewlistComponent, TasklistItemsComponent]
})
export class SidebarComponent {

}
