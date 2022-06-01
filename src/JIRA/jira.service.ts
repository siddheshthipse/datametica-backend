import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JiraService {
  requestHeader = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(
        'avinash.20399@gmail.com:UITNGL6gfHuriv9Qu56JBC48',
      ).toString('base64')}`,
      Accept: 'application/json',
    },
  };

  url = 'https://teampredators.atlassian.net/rest/api/3';

  async getAllProject() {
    const res = [];
    const projectDetail = await axios(
      `${this.url}/project`,
      this.requestHeader,
    );
    let index = 0;
    for (const element of projectDetail.data) {
      // extract all info about it's epic
      const numberOfEpic = await axios(
        `${this.url}/search?jql=issuetype=Epic AND project=${element.key}`,
        this.requestHeader,
      );
      // extract all info about it's user story
      const numberOfUserStory = await axios(
        `${this.url}/search?jql=issuetype=Story AND project=${element.key}`,
        this.requestHeader,
      );
      // extract all info about it's bugs story
      const numberOfBugs = await axios(
        `${this.url}/search?jql=issuetype=Bug AND project=${element.key}`,
        this.requestHeader,
      );
      // extract all info about it's Subtask story
      const numberOfSubtask = await axios(
        `${this.url}/search?jql=issuetype=Subtask AND project=${element.key}`,
        this.requestHeader,
      );
      // create data
      res[index] = {
        key: element.key,
        name: element.name,
        totalEpic: numberOfEpic.data.total,
        totalStory: numberOfUserStory.data.total,
        totalBug: numberOfBugs.data.total,
        totalSubtask: numberOfSubtask.data.total,
      };
      index++;
    }

    return res;
  }
}
