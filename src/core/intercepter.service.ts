import { Injectable } from "@nestjs/common";
import { URL } from 'url';
import { getMatchedSync } from './intercepter';
import * as WebsitesMock from './websites_mock.json';
import * as FilesMock from './files_mock.json';
import { WebSiteDataModel } from './types';
import { writeFileSync } from './fileSysCache';


@Injectable()
export class IntercepterService {
  constructor() { }

  get websites(): Record<string, WebSiteDataModel> {
    // return this.configService.get('WEBSITES');
    return WebsitesMock as Record<string, WebSiteDataModel>
  }


  async readHtml(urlObj: URL) {
    const { data: matchedData, path: matchedPath } = getMatchedSync(urlObj, this.websites) || {};
    // const html = await this.configService.get(matchedPath);

    if (!matchedData) return null

    const html = FilesMock[matchedData.pageId]
    writeFileSync(urlObj.hostname, matchedPath, html);
    return html;
  }
}