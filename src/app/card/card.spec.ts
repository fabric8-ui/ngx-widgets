import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CardComponent } from './card.component';

describe('Card component', () => {

  let cardComponent: CardComponent;
  let cardComponentFixture: ComponentFixture<CardComponent>;
  let cardHeaderDebugElement: DebugElement;
  let cardHeaderElement: HTMLElement;
  let cardBodyDebugElement: DebugElement;
  let cardBodyElement: HTMLElement;
  let cardFooterDebugElement: DebugElement;
  let cardFooterElement: HTMLElement;

  beforeEach(() => {
    // Use TestBed to configure module for the tests below
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    }).compileComponents();

    // Use TestBed to create ComponentFixture for our CardComponent
    cardComponentFixture = TestBed.createComponent(CardComponent);
    // Access CardComponent instance
    cardComponent = cardComponentFixture.componentInstance;

    cardHeaderDebugElement = cardComponentFixture.debugElement.query(By.css('.f8-card-header'));
    cardHeaderElement = cardHeaderDebugElement.nativeElement;

    cardBodyDebugElement = cardComponentFixture.debugElement.query(By.css('.f8-card-body'));
    cardBodyElement = cardBodyDebugElement.nativeElement;

    cardFooterDebugElement = cardComponentFixture.debugElement.query(By.css('.f8-card-footer'));
    cardFooterElement = cardFooterDebugElement.nativeElement;
  });

  it('should have a component instance', () => {
    expect(cardComponent).toBeTruthy();
  });

  it('initially header should be empty', () => {
    cardComponentFixture.detectChanges();
    expect(cardHeaderElement.textContent).toContain('');
  });

  it('initially body should be empty', () => {
    cardComponentFixture.detectChanges();
    expect(cardBodyElement.textContent).toContain('');
  });

  it('initially footer should be empty', () => {
    cardComponentFixture.detectChanges();
    expect(cardFooterElement.textContent).toContain('');
  });
});
