import { Component } from '@angular/core';
import { CardConfig } from './../card.model';

@Component({
  selector: 'card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.less'],
})
export class CardExampleComponent {

  cardConfig = {
    height: 'auto',
    width: '288px',
    cardColor: '#fafafb',
    shadow: true,
    shadowValue: '0 1px 3px #d6d9dc',
    border: true,
    borderStyle: 'solid',
    borderColor: '#d6d9dc',
    borderWidth: '1px',
    borderRadius: true,
    borderRadiusValue: '5px',
    margin: '20px'
  } as CardConfig;
}
