import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import Step from '../../../Types/step.model';
import { TaskService } from '../../../services/task.service';
import { StepService } from '../../../services/step.service';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {

  @Input()
  public step! : Step;

  @ViewChild('stepContextMenu')
  stepContextMenuEle!: ElementRef<HTMLDivElement>;

  @ViewChild('stepDone')
  stepInput! : ElementRef<HTMLInputElement>;

  constructor(private taskService: TaskService, private stepService: StepService) {
    this.stepService.getContextMenuSubject().subscribe(() => {
      this.closeStepContextMenu();
    });
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.stepContextMenuEle.nativeElement.style.display = "none";
  }

  stepDoneTD($event: any, step: Step) {
    if($event?.target?.checked){
      step.done = true;
    } else {
      step.done = false;
    }
  }

  stepContextMenuFun($event: MouseEvent) {
    this.stepService.getContextMenuSubject().next("step");
    $event.preventDefault();
    this.stepContextMenuEle.nativeElement.style.display = "block";
    this.stepContextMenuEle.nativeElement.style.position = "absolute";
    this.stepContextMenuEle.nativeElement.style.left = $event.pageX+"px";
    this.stepContextMenuEle.nativeElement.style.top = $event.pageY+"px";
  }

  menuStepComplete(checked: boolean) {
    this.closeStepContextMenu();
    this.stepInput.nativeElement.checked = !checked;
    this.step.done = !checked;
  }

  closeStepContextMenu() {
    if(this.stepContextMenuEle.nativeElement.style.display == "block"){
      this.stepContextMenuEle.nativeElement.style.display  ="none";
    }
  }

  promoteToTask($event: MouseEvent,arg1: Step) {

  }

  deleteStep() {
    this.stepService.getStepSubject().next({step : this.step, action : "delete"});
  }




}
