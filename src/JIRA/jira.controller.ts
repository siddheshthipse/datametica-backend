import { Controller, Get } from '@nestjs/common';
import { JiraService } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraSerivce: JiraService) {}

  @Get('project')
  async getAllProject() {
    return this.jiraSerivce.getAllProject();
  }
}
