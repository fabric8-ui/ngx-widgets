import { Component, Input, TemplateRef } from '@angular/core';
import { CardConfig, defaultCardConfig } from './card.model';

@Component({
  selector: 'f8-card',
  templateUrl: './card.component.html'
})

export class CardComponent {
  @Input() header: TemplateRef<any>;
  @Input() body: TemplateRef<any>;
  @Input() footer: TemplateRef<any>;
  @Input('config') set configInput(config: CardConfig) {
    this.cardConfig = {...defaultCardConfig, ...config};
  }

  private cardConfig: CardConfig = defaultCardConfig;
}
