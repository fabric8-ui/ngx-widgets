import {
  Component,
  ElementRef,
  ViewEncapsulation,
  Input,
  Output,
  OnChanges,
  OnInit,
  ViewChild,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8-inlineinput',
  styleUrls: ['./inlineinput.component.scss'],
  templateUrl: './inlineinput.component.html'
})

export class InlineInputComponent implements OnInit {
  @ViewChild('input') inputField: ElementRef;

  @Input('disabled') readOnly: boolean = false;
  @Input('value') inpvalue: string = 'Hello World';
  @Input() placeholder: string = 'This is just a place holder';
  @Input() onLineClickEdit: boolean = true;

  @Output() onSave = new EventEmitter();

  private saving: boolean = false;
  private editing: boolean = false;
  private previousValue: string = '';
  private errorMessage: string = '';

  ngOnInit() {
  }

  startEditing(event: Event, onLineClick: boolean) {
    this.errorMessage = '';
    if (!this.readOnly || !this.editing &&
      ((onLineClick && this.onLineClickEdit) || !onLineClick)) {
      this.editing = true;
      this.previousValue = this.inputField.nativeElement.value;
      this.inputField.nativeElement.focus();
    } else {
      this.inputField.nativeElement.blur();
    }
  }

  saveClick() {
    this.errorMessage = '';
    this.saving = true;
    this.onSave.emit({
      value: this.inputField.nativeElement.value,
      callBack: (v: string = '', e: string = '') => this.handleSave(v, e)
    });
  }

  closeClick() {
    this.errorMessage = '';
    this.inpvalue = this.previousValue;
    this.inputField.nativeElement.value = this.previousValue;
    this.previousValue = '';
    this.editing = false;
  }

  handleSave(value: string, error: string) {
    this.errorMessage = error;
    this.saving = false;
    if (this.errorMessage) {

    } else {
      this.editing = false;
      this.inpvalue = value;
    }
  }
}
