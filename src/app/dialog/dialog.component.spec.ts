import {
  async,
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { By }           from '@angular/platform-browser';

import { Dialog } from './dialog';
import { DialogComponent } from './dialog.component';

describe('Dialog component - ', () => {
  let comp: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let el: DebugElement;
  let dialog: Dialog;

  beforeEach(() => {
    dialog = {
      'title': 'Dialog Title',
      'message': 'Dialog Message',
      'actionButtons': [{'title': 'Yes', 'value': 1, 'default': false}, {'title': 'No', 'value': 0, 'default': true}]
    } as Dialog;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule],
      declarations: [DialogComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DialogComponent);
        comp = fixture.componentInstance;
      });
  }));

  it('Do not display dialog header if not provided', async(() => {
    comp.dialog = dialog;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el = fixture.debugElement.query(By.css('h4'));
      comp.dialog.title = '';
      fixture.detectChanges();
    }).then(() => {
      expect(el.nativeElement.textContent).toContain(comp.dialog.title);
    });
  }));

  it('Display dialog header when provided', async(() => {
    comp.dialog = dialog;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el = fixture.debugElement.query(By.css('h4'));
      comp.dialog.title = 'This is a header';
      fixture.detectChanges();
    }).then(() => {
      expect(el.nativeElement.textContent).toContain(comp.dialog.title);
    });
  }));

  it('Do not display dialog message if not provided', async(() => {
    comp.dialog = dialog;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el = fixture.debugElement.query(By.css('#alm-dialog-message'));
      comp.dialog.message = '';
      fixture.detectChanges();
    }).then(() => {
      expect(el.nativeElement.textContent).toContain(comp.dialog.message);
    });
  }));

  it('Display dialog message when provided', async(() => {
    comp.dialog = dialog;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el = fixture.debugElement.query(By.css('#alm-dialog-message'));
      comp.dialog.message = 'Dialog Message Test';
      fixture.detectChanges();
    }).then(() => {
      expect(el.nativeElement.textContent).toContain(comp.dialog.message);
    });
  }));

  it('Dialog will not display buttons if not provided', async(() => {
    comp.dialog = dialog;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el = fixture.debugElement.query(By.css('.modal-footer'));
      comp.dialog.actionButtons = [];
      fixture.detectChanges();
    }).then(() => {
      expect(el.children.length).toBe(comp.dialog.actionButtons.length);
    });
  }));

  it('Dialog will display as many buttons passed to it.', async(() => {
    comp.dialog = dialog;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el = fixture.debugElement.query(By.css('.modal-footer'));
      comp.dialog.actionButtons = [{'title': 'Test Button', 'value': 1, 'default': false}];
      fixture.detectChanges();
    }).then(() => {
      expect(el.children.length).toBe(comp.dialog.actionButtons.length);
    });
  }));

  xit('Clicking a button will close the dialog.', async(() => {
    comp.dialog = dialog;
    fixture.detectChanges();
    comp.btnClick(0);
    setTimeout(() => {
      expect(comp.modalFadeIn).toBeFalsy();
    }, 300); // 300ms takes to close the modal
  }));

});
