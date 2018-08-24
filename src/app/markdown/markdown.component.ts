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
  SimpleChanges,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8-markdown',
  styleUrls: ['./markdown.component.less'],
  templateUrl: './markdown.component.html'
})

/**
 * Implements a markdown component. Important: in order that the checkbox
 * feature is working, the rendered content set using the attribute needs
 * to be wrapped into a SafeValue instance. This prevents the sanitizer
 * to strip the input fields needed for the checkboxes from the rendered
 * html.
 */
export class MarkdownComponent implements OnChanges, OnInit, AfterViewChecked {

  @Input() fieldName: string = 'Description';
  @Input('renderedText') inpRenderedText: string | SafeHtml = '';
  @Input('rawText') inpRawText: string = '';
  @Input() rendering: boolean = false;
  @Input() saving: boolean = false;
  @Input() placeholder: string = 'This is place holder';
  @Input() editAllow: boolean = true;
  @Input() renderedHeight: number = 300;
  @Input() allowEmptySave: boolean = true;

  @Output() onActiveEditor = new EventEmitter();
  @Output() onSaveClick = new EventEmitter();
  @Output() showPreview = new EventEmitter();
  @Output() onCloseClick = new EventEmitter();

  @ViewChild('editorInput') editorInput: ElementRef;
  @ViewChild('editorBox') editorBox: ElementRef;
  @ViewChild('previewArea') previewArea: ElementRef;

  boxHeight: number;
  enableShowMore: boolean = false;
  // these need to be public for the tests accessing them.
  renderedText: any = '';
  rawText = '';
  fieldEmpty: boolean = true;
  previousRawText = '';

  private markdownViewExpanded: boolean = false;
  private tabBarVisible: boolean = true;
  private viewType: string = 'preview'; // markdown
  private editorActive: boolean = false;
  private showMore = false;
  private inputsDisabled = false;

  private previousRenderedText = '';

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.editAllow &&
      this.editAllow === false &&
      !changes.editAllow.isFirstChange) {
      this.closeClick();
    }
    if (Object.keys(changes).indexOf('inpRenderedText') > -1
      && typeof(this.inpRenderedText) === 'undefined') {
        console.warn('Markdown component change :: renderedText is passed undefined');
        this.renderedText = '';
    } else {
      this.renderedText = this.inpRenderedText;
    }
    if (Object.keys(changes).indexOf('inpRawText') > -1
      && typeof(this.inpRawText) === 'undefined') {
        console.warn('Markdown component change :: rawText is passed undefined');
        this.rawText = '';
    } else {
      this.rawText = this.inpRawText;
    }
  }

  ngOnInit() {
    if (typeof(this.renderedText) === 'undefined') {
      console.warn('Markdown component init :: renderedText is passed undefined');
      this.renderedText = '';
    }
    if (typeof(this.rawText) === 'undefined') {
      console.warn('Markdown component init :: rawText is passed undefined');
      this.rawText = '';
    }
  }

  ngAfterViewChecked() {
    if (this.editorBox) {
      this.boxHeight = this.editorBox.nativeElement.offsetHeight;
      if (this.boxHeight > this.renderedHeight) {
        this.enableShowMore = true;
      } else {
        this.enableShowMore = false;
      }
      this.cdr.detectChanges();
    }
    this.checkInputsDisabled();
  }

  onInputEvent(event: any) {
       console.log('In-Markup Markdown input Event detected for input type: ' + event.type +
      ' with extraData ' + JSON.stringify(event.extraData));
      // we only support this interaction on checkboxes for now.
      // the mechanic is generic, add other controls below. In case,
      // you need to also add support for them in github-link-area as well.
      if (event.type === 'checkbox') {
        // disable the inputs so we don't get into async issues when
        // storing to the upstream component. This has to be done on
        // new supported input types as well.
        this.inputsDisabled = true;
        // process the checkbox clicked, find the markdown markup reference, update it.
        let activatedCheckboxIndex: number = event.extraData.checkboxIndex;
        let checked: boolean = event.extraData.checked;
        let markdownMarkup: string = this.rawText;
        // the JavaScript RegExp flavour makes it hard to to nth occurence
        // expressions, so we're doing it by hand here.
        const regex = /^ *[-*] *\[[ xX]*\]/gm;
        let m;
        let matchIndex = 0;
        // tslint:disable-next-line:no-conditional-assignment
        while ((m = regex.exec(markdownMarkup)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches.
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          if (matchIndex === activatedCheckboxIndex && m.length > 0) {
            // JavaScript does not have a replace by index method.
            let matchLen = m[0].length;
            let matchEndIndex = regex.lastIndex;
            let matchStartIndex = matchEndIndex - matchLen;
            let replaceStr;
            if (checked)
              replaceStr = m[0].replace(/\[[ ]*\]/, '[x]');
            else
              replaceStr = m[0].replace(/\[[xX]+\]/, '[ ]');
            markdownMarkup =
              markdownMarkup.substring(0, matchStartIndex) +
              replaceStr +
              markdownMarkup.substring(matchEndIndex, markdownMarkup.length);
          }
          matchIndex++;
        }
        this.rawText = markdownMarkup;
        // signal that the markdown has changed to the outside world.
        this.saveClick();
      } else {
        console.log('Input type ' + event.type + ' is not supported yet.');
      }
  }

  onClickMarkdownTab() {
    if (this.viewType === 'preview') {
      this.viewType = 'markdown';
    }
  }

  onClickPreviewTab() {
    if (this.viewType === 'markdown') {
      if (this.rawText !== this.editorInput.nativeElement.innerText.trim()) {
        // Emit raw text to get preview
        this.rawText = this.editorInput.nativeElement.innerText.trim();
        this.showPreview.emit({
          rawText: this.rawText,
          callBack: (t: string, m: string) => this.renderPreview(t, m)
        });
        this.rendering = true;
      } else {
        this.viewType = 'preview';
      }
    }
  }

  checkInputsDisabled() {
    this.setPreviewInputsDisabled('input.markdown-checkbox', this.inputsDisabled);
  }

  // disables/enables the inputs on the rendered markup
  setPreviewInputsDisabled(query: string, disabled: boolean) {
    let el = this.previewArea;
    if (el) {
      let queryElems = el.nativeElement.querySelectorAll(query);
      if (queryElems && queryElems.length > 0) {
        // we need to use a classic loop instead of forEach here
        // as forEach on NodeLists is not supported on every browser.
        // Example: Chrome works, but Protractor not.
        for (let i = 0; i < queryElems.length; ++i) {
          if (disabled) {
            queryElems[i].setAttribute('disabled', disabled ? 'true' : 'false');
          } else {
            queryElems[i].removeAttribute('disabled');
          }
        }
      }
    }
  }

  enableEditor() {
    if (this.rawText === '' ) {
      this.activeEditor();
    }
    this.inputsDisabled = true;
  }

  activeEditor() {
    if (this.editAllow) {
      // Activate the editor
      this.editorActive = true;

      // Show the markdown default view
      this.viewType = 'markdown';

      // Save current values
      this.previousRawText = this.rawText;
      this.previousRenderedText = this.renderedText;

      this.onActiveEditor.emit(true);
    }
  }

  deactivateEditor() {
    // Deactivate the editor
    this.editorActive = false;

    // deactivate inputs when in edit mode
    this.inputsDisabled = false;

    // Show the preview default view
    this.viewType = 'preview';
  }

  saveClick() {
    if (this.allowEmptySave || (!this.fieldEmpty && !this.allowEmptySave)) {
      if (this.viewType === 'markdown' &&
        this.previousRawText !== this.editorInput.nativeElement.innerText.trim()) {
        this.saving = true;
        this.onSaveClick.emit({
          rawText: this.editorInput.nativeElement.innerText.trim(),
          callBack: (t: string, m: string) => this.saveUpdate(t, m)
        });
      } else if (this.viewType === 'preview' &&
        this.previousRawText !== this.rawText) {
        this.saving = true;
        this.onSaveClick.emit({
          rawText: this.rawText,
          callBack: (t: string, m: string) => this.saveUpdate(t, m)
        });
      } else {
        this.deactivateEditor();
      }
    }
  }

  editorKeyUp(event: Event) {
    // Do not use this.event.srcElement. The "event" object is not consistent
    // across browsers. Chrome has event.srcElement while firefox has event.originalTarget.
    this.fieldEmpty = this.editorInput.nativeElement.innerText.trim()  === '';
  }

  closeClick() {
    // Restore saved previous data
    this.rawText = this.previousRawText;
    this.renderedText = this.previousRenderedText;
    this.deactivateEditor();
    this.onCloseClick.emit();
  }

  renderPreview(rawText: string, renderedText: string) {
    this.rendering = false;
    if (typeof(rawText) === 'undefined') {
      console.warn('Markdown component preview callback :: rawText is passed undefined');
      this.rawText = '';
    } else {
      this.rawText = rawText;
    }
    if (typeof(renderedText) === 'undefined') {
      console.warn('Markdown component preview callback :: renderedText is passed undefined');
      this.renderedText = '';
    } else {
      this.renderedText = renderedText;
    }
    this.viewType = 'preview';
  }

  saveUpdate(rawText: string, renderedText: any) {
    this.saving = false;
    if (typeof(rawText) === 'undefined') {
      console.warn('Markdown component save callback :: rawText is passed undefined');
      this.rawText = '';
    } else {
      this.rawText = rawText;
    }
    if (typeof(renderedText) === 'undefined') {
      console.warn('Markdown component save callback :: renderedText is passed undefined');
      this.renderedText = '';
    } else {
      this.renderedText = renderedText;
    }
    // finally, deactivate the editor.
    this.deactivateEditor();
  }

  lengthToggle(showMore: boolean) {
    this.showMore = showMore;
  }
}
