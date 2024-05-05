import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import Task from '../../Types/task.model';
import { DatePipe, JsonPipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import Step from '../../Types/step.model';
import { FooterComponent } from './footer/footer.component';
import { StepComponent } from './step/step.component';
import { StepService } from '../../services/step.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [ DatePipe, FormsModule, FooterComponent, StepComponent],
  templateUrl: './todo-detail.component.html',
  styles: ['div.main { display: grid; grid-template-columns: 1fr; grid-template-rows: 50px auto 50px; color: white; font-family: \'noto sans display\', \'Courier New\', Courier, monospace;font-size: smaller; height: 100vh;  }'],
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent {

  @Input()
  public task!: Task;

  @ViewChild('todo-detail')
  todoDetail!: ElementRef<HTMLDivElement>;
  toggleAddStepFlag: boolean = false;

  @ViewChild('stepInput')
  stepInputField!: ElementRef<HTMLInputElement>;

  @ViewChild('stepDone')
  stepDoneField!: ElementRef<HTMLInputElement>;

  constructor(private taskService: TaskService, private stepService: StepService) {
    this.stepService.getStepSubject().subscribe(stepAction => {
      if (stepAction.action === "delete"){
        this.deleteStepFromTask(stepAction.step.id);
      }
    });
  }

  closeTodoDetail($event: MouseEvent) {
    this.taskService.getShowTaskDetailsSubject().next({task: this.task, action: "hide"});
  }

  taskImportantTD($event: any) {
    if($event?.target?.checked){
      this.task.important = true;
    } else {
      this.task.important = false;
    }
  }

  taskDoneTD($event: any) {
    if($event?.target?.checked){
      this.task.done = true;
    } else {
      this.task.done = false;
    }
  }

  toggleAddStep(event: any){
    this.toggleAddStepFlag = true;
    this.stepInputField!.nativeElement.focus();
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.toggleAddStepFlag = false;
  }

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if(this.stepInputField.nativeElement.value != ''){
      if(typeof this.task.steps == "undefined") {
        this.task.steps = [{id: uuidv4(), name: this.stepInputField.nativeElement.value,  done: false}];
      } else {
        this.task.steps?.push({id: uuidv4(), name: this.stepInputField.nativeElement.value,  done: false})
      }
      this.toggleAddStepFlag = false;
    }
  }

  deleteStepFromTask(id: string) {
    this.task.steps = this.task.steps?.filter(step => step.id != id);
  }
}

