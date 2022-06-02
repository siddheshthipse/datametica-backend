import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JiraService } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraSerivce: JiraService) {}

  @Get('project')
  async getAllProject() {
    return this.jiraSerivce.getAllProject();
  }

  @Get('dashboard')
  async getDashboardScreen(@Query('key') key: string) {
    return this.jiraSerivce.getDashboardScreen(key);
  }
}
