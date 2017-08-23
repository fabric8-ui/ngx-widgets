import { Component, ViewEncapsulation, ElementRef } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'inlineinput-example',
  styleUrls: ['./inlineinput-example.component.scss'],
  templateUrl: './inlineinput-example.component.html'
})


export class InlineInputExampleComponent {
  saveTitle(event: any) {
    const value = event.value;
    const callBack = event.callBack;
    setTimeout(() => {
      callBack('Updated: ' + value);
    }, 1000);
  }

  saveTitleError(event: any) {
    const value = event.value;
    const callBack = event.callBack;
    setTimeout(() => {
      callBack('Updated: ' + value, 'Some server error');
    }, 1000);
  }
}
