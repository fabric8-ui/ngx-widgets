import {
  Component,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { 
  HttpClient 
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";

/**
 * GitHub Link component. This shows a formatted link to GitHub with an
 * indicator of whether the GitHub issue is open or closed. Works only
 * for public remote repositories for now.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'github-link',
  styles: [ `
    .gh-link-hidden { display: none; }
    .gh-link-open { color: red; }
    .gh-link-closed { color: green; }
    .gh-link-error { color: orange; }
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
        this.http.get('https://api.github.com/repos/' + this.urlData.org + '/' + this.urlData.repo + '/issues/' + this.urlData.issue)
          .catch(error => {
            return Observable.of({state: "error"});
          })
          .subscribe(data => {
            this.state = data['state'];
          })
      } else {
        this.state = "error";
      }
    }
  }

  /**
   * The default constructor
   */
  constructor(private http: HttpClient) {}
}
