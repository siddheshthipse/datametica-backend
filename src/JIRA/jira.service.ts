import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JiraService {
  requestHeader = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(
        'siddheshthipse@gmail.com:MhlA4DZGDxeykbvWm7g71A84',
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

  async getDashboardScreen(key: string) {
    // extract all info about it's epic
    const epics = await axios(
      `${this.url}/search?jql=issuetype=Epic AND project=${key}`,
      this.requestHeader,
    );
    // create epic part for res
    const epicsD = {
      count: epics.data.total,
      epicsData: [],
    };
    // extract all info about it's user story
    for (const elem of epics.data.issues) {
      const data = {
        key: elem.key,
        name: elem.fields.summary,
        status: elem.fields.status.name,
        assignedTo: elem.fields.assignee.displayName,
        createdBy: elem.fields.creator.displayName,
      };
      epicsD.epicsData.push(data);
    }

    const story = await axios(
      `${this.url}/search?jql=issuetype=Story AND project=${key}`,
      this.requestHeader,
    );
    // create story for res
    const storyD = {
      count: story.data.total,
      storyData: [],
    };
    // extract all info about it's user story
    for (const elem of story.data.issues) {
      const data = {
        key: elem.key,
        name: elem.fields.summary,
        status: elem.fields.status.name,
        assignedTo: elem.fields.assignee.displayName,
        createdBy: elem.fields.creator.displayName,
      };
      storyD.storyData.push(data);
    }

    // extract all info about it's bugs story
    const bugs = await axios(
      `${this.url}/search?jql=issuetype=Bug AND project=${key}`,
      this.requestHeader,
    );
    // create story for res
    const bugsD = {
      count: bugs.data.total,
      bugsData: [],
    };
    // extract all info about it's user story
    for (const elem of bugs.data.issues) {
      const data = {
        key: elem.key,
        name: elem.fields.summary,
        status: elem.fields.status.name,
        assignedTo: elem.fields.assignee.displayName,
        createdBy: elem.fields.creator.displayName,
      };
      bugsD.bugsData.push(data);
    }

    // extract all info about it's Subtask story
    const subtasks = await axios(
      `${this.url}/search?jql=issuetype=Subtask AND project=${key}`,
      this.requestHeader,
    );
    // create story for res
    const subtaskD = {
      count: subtasks.data.total,
      subtaskData: [],
    };
    // extract all info about it's user story
    for (const elem of subtasks.data.issues) {
      const data = {
        key: elem.key,
        name: elem.fields.summary,
        status: elem.fields.status.name,
        assignedTo: elem.fields.assignee.displayName,
        createdBy: elem.fields.creator.displayName,
      };
      subtaskD.subtaskData.push(data);
    }

    const res = {
      epics: epicsD,
      stories: storyD,
      subtasks: subtaskD,
      bugs: bugsD,
    };
    return res;
  }
}
