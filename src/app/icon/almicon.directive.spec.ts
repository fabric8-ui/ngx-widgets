import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlmIconTest } from './almicon-test.component';
import { AlmIconDirective } from './almicon.directive';

describe('AlmIcon directive - ', () => {
  let comp: AlmIconTest;
  let fixture: ComponentFixture<AlmIconTest>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlmIconTest,
        AlmIconDirective
      ]
    });
  }));

  it('Should apply appropriate class and color', async(() => {
    TestBed.overrideComponent(AlmIconTest, {
      set: {
        template: '<span almIcon iconType="new"></span>'
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AlmIconTest);
      comp = fixture.componentInstance;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let compiled = fixture.debugElement.nativeElement
          .querySelector('span');
        expect(compiled.className).toBe('fa fa-star');
        expect(compiled.style.color).toBe('rgb(88, 47, 192)');
      });
    });
  }));

  it('Should apply default class and color', async(() => {
    TestBed.overrideComponent(AlmIconTest, {
      set: {
        template: '<span almIcon iconType="anything"></span>'
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AlmIconTest);
      comp = fixture.componentInstance;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let compiled = fixture.debugElement.nativeElement
          .querySelector('span');
        expect(compiled.className).toBe('fa fa-crosshairs');
        expect(compiled.style.color).toBe('rgb(0, 0, 0)');
      });
    });
  }));

});

