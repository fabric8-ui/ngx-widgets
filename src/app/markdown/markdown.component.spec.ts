import {
  async,
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';

import { DebugElement, SimpleChanges, SimpleChange } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { By }           from '@angular/platform-browser';

import { MarkdownModule } from './markdown.module';
import { MarkdownComponent } from './markdown.component';

describe('Markdown component - ', () => {
  let comp: MarkdownComponent;
  let fixture: ComponentFixture<MarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MarkdownModule ],
      declarations: [ ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MarkdownComponent);
        comp = fixture.componentInstance;
      });
  }));

  it('Should render handle Markdown checkboxes correctly.', () => {
      // tslint:disable-next-line:max-line-length
      comp.inpRawText = '# hello, markdown!\n* [ ] Item 1\n* [x] Item 2\n* [ ] Item 3';
      comp.inpRenderedText = '<h1>hello, markdown!\</h1><ul>' +
      // tslint:disable-next-line:max-line-length
      '<li><input class="markdown-checkbox" type="checkbox" data-checkbox-index="0"></input> Item 0</li>' +
      // tslint:disable-next-line:max-line-length
      '<li><input class="markdown-checkbox" type="checkbox" checked="" data-checkbox-index="1"></input> Item 1</li>' +
      // tslint:disable-next-line:max-line-length
      '<li><input class="markdown-checkbox" type="checkbox" data-checkbox-index="2"></input> Item 2</li></ul>';
      // this first detectChanges() updates the component that one of the @Inputs has changed.
      fixture.detectChanges();
      // because of https://github.com/angular/angular/issues/9866, detectChanges() does not
      // call ngOnChanges() on the component (yeah, it it as broken as it sounds). So
      // we need to call the component manually to update.
      comp.ngOnChanges({
        inpRawText: {} as SimpleChange,
        inpRenderedText: {} as SimpleChange
      } as SimpleChanges);
      // and because the test framework is not even able to detect inner changes to a component,
      // we need to call detectChanges() again.
      fixture.detectChanges();
      // also, using query() is also not working. Maybe due to the dynamic update of innerHTML.
      // So we need to use the nativeElement to get a selector working.
      // tslint:disable-next-line:max-line-length
      let markdownPreview: Element = fixture.debugElement.nativeElement.querySelector('.markdown-rendered');
      expect(markdownPreview).not.toBeNull();
      // preview render of the template default
      let markdownCheckboxElementList = markdownPreview.querySelectorAll('.markdown-checkbox');
      expect(markdownCheckboxElementList).not.toBeNull();
      expect(markdownCheckboxElementList.length).toBe(3);
      expect(markdownCheckboxElementList[0].hasAttribute('checked')).toBeFalsy();
      expect(markdownCheckboxElementList[1].hasAttribute('checked')).toBeTruthy();
      expect(markdownCheckboxElementList[2].hasAttribute('checked')).toBeFalsy();
      // tick a checkbox
      let checkboxElem = markdownCheckboxElementList[0] as HTMLElement;
      checkboxElem.click();
      // see if it ends up in the Markdown
      expect(comp.rawText.indexOf('[x] Item 1')).toBeGreaterThan(-1);
      // tick another checkbox
      checkboxElem = markdownCheckboxElementList[2] as HTMLElement;
      checkboxElem.click();
      // see if it ends up in the Markdown
      expect(comp.rawText.indexOf('[x] Item 3')).toBeGreaterThan(-1);
      // untick a checkbox
      checkboxElem = markdownCheckboxElementList[1] as HTMLElement;
      checkboxElem.click();
      // see if it ends up in the Markdown
      expect(comp.rawText.indexOf('[ ] Item 2')).toBeGreaterThan(-1);
    });

});
