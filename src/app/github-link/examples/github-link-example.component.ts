import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'github-link-example',
  styles: [`
    .sample-form .form-horizontal .form-group {
      margin-left: 0;
    }
    .padding-top-15 {
      padding-top: 15px;
    }
    .padding-bottom-15 {
      padding-bottom: 15px;
    }
  `],
  templateUrl: './github-link-example.component.html'
})
export class GitHubLinkExampleComponent implements OnInit {

  url: string = 'https://github.com/patternfly/patternfly-ng/issues/127';

  constructor() {}

  ngOnInit(): void {}
}
