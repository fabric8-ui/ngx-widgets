import {
  Component,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { GitHubLinkService } from './../github-link-area/github-link.service';

/**
 * GitHub Link component. This shows a formatted link to GitHub with an
 * indicator of whether the GitHub issue is open or closed. Works only
 * for public remote repositories for now.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'github-link',
  styles: [ `
    .gh-link-open { color: @color-pf-red; }
    .gh-link-closed { color: @color-pf-green; }
    .gh-link-error { color: @color-pf-orange; }
    `],
  templateUrl: './github-link.component.html'
})
export class GitHubLinkComponent implements OnChanges {

  /**
   * The original GitHub URL.
   */
  @Input() url: string;

  /**
   * This buffers the URL data.
   */
  urlData: any;

  /**
   * This buffers the remote state.
   */
  state: string = 'error';

  constructor(private gitHubLinkService: GitHubLinkService) {}

  parseUrl(url: string): any {
    let regexp: RegExp = new RegExp('^https://github.com/(.*)/(.*)/issues/(.*)$');
    let result = regexp.exec(url);
    if (result)
      return {
        org: result[1],
        repo: result[2],
        issue: result[3]
      }
    else
      return null;
  }

  getLabel(): string {
    return this.urlData.repo + ':' + this.urlData.issue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.url) {
      this.urlData = this.parseUrl(changes.url.currentValue);
      if (this.urlData) {
        this.gitHubLinkService.getIssue(this.urlData)
          .subscribe(data => {
            this.state = data['state'];
          });
      } else {
        this.state = 'error';
      }
    }
  }

}
