import { Component, Input, Output, EventEmitter } from '@angular/core';
import { popUpDialog } from './pop-up-dialog.interface';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss']
})
export class PopUpDialogComponent {

  constructor() { }

  @Input() displayPopUp:boolean = true;
  @Input() popUpOptions: popUpDialog = {
    text: "Displayed text",
    critical: false,
    actions: {
      ok: "Proceed",
      cancel: "Cancel"
    }
  }
  @Output() selectedAction = new EventEmitter();

  runAction = (actionResult: boolean) => {
    this.selectedAction.emit(actionResult);
  }
}
