import {
  Component,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';

import { GitHubLinkService } from './github-link.service';

/**
 * GitHub Link Area component. This shows a formatted link to GitHub with an
 * indicator of whether the GitHub issue is open or closed in an text area.
 * Works only for public remote repositories for now. See example for how to
 * use this.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'github-link-area',
  styles: [ `
    .gh-link-open { color: @color-pf-red; }
    .gh-link-closed { color: @color-pf-green; }
    .gh-link-error { color: @color-pf-orange; }
    `],
  templateUrl: './github-link-area.component.html'
})
export class GitHubLinkAreaComponent implements OnChanges {

  @Input('content') content: string;

  constructor(private gitHubLinkService: GitHubLinkService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.content) {
      this.updateLinkTexts();
      this.updateLinks();
    }
  }

  /*
   * Replaces the match (which should be the default icon) with an icon that
   * indicates the status contained in linkData.
   */
  replaceLink(linkData: any): void {
    this.content = this.content.split(linkData.match).join(
      (linkData.state === 'open' ? '<span class="gh-link-open fa fa-clock-o"></span>' : '') +
      (linkData.state === 'closed' ? '<span class="gh-link-closed fa fa-check"></span>' : '') +
      ((linkData.state !== 'open' && linkData.state !== 'closed') ?
        '<span class="gh-link-error fa pficon-warning-triangle-o"></span>' : '')
    );
  }

  /*
   * This does a preliminary synchonous replacement of the original html link with
   * a formatted version and an "unknown status" icon. This first step is needed to
   * not "flash" the original links in the field before updating the icons. In the
   * next step (in updateLinks()), the "unknown status" icon is replaced with the 
   * actual status icon.
   */
  updateLinkTexts(): void {
    // the following regexp only matches a specific way of links, namely links with no
    // additional classes etc.; if a markdown compiler (or some other content source)
    // creates different links to GitHub, this regexp needs to be extended to match 
    // those formats.
    let regexp: RegExp = new RegExp(
      '<a href="https:\/\/github.com\/([^\/]+)\/([^\/]+)\/issues\/([^"]+)">([^<]+)<\/a>', 'gi'
    );
    let result = regexp.exec(this.content);
    while (result) {
      this.content = this.content.split(result[0]).join('<a href="https://github.com/' +
        result[1] + '/' +
        result[2] + '/' +
        '/issues/' + result[3] + '">' +
        '<span class="gh-link-system fa fa-github"></span><span class="gh-link-label"> ' +
        result[2] + ':' + result[3] + ' ' +
        '<span ' +
          'data-gh-org="' + result[1] + '" ' +
          'data-gh-repo="' + result[2] + '" ' +
          'data-gh-issue="' + result[3] + '" ' +
        'class="gh-link-error fa pficon-warning-triangle-o"></span>' +
        '</a>');
      result = regexp.exec(this.content);
    }
  }

  /*
   * This updates the icons asynchonously and only replaces the "unknown status" icon
   * with the actual icon matching the remote status. The data is retrieved using the
   * GitHubLinkService to use caching.
   */
  updateLinks(): void {
    let regexp: RegExp = new RegExp(
      // tslint:disable-next-line:max-line-length
      '<span data-gh-org="([^"]+)" data-gh-repo="([^"]+)" data-gh-issue="([^"]+)" class="gh-link-error fa pficon-warning-triangle-o"></span>', 'gi'
    );
    let result = regexp.exec(this.content);
    while (result) {
      let thisLinkData = {
        match: result[0],
        org: result[1],
        repo: result[2],
        issue: result[3],
        state: 'error'
      };
      this.gitHubLinkService.getIssue(thisLinkData)
        .subscribe(data => {
          thisLinkData.state = data['state'];
          this.replaceLink(thisLinkData);
        });
      result = regexp.exec(this.content);
    }
  }

}
