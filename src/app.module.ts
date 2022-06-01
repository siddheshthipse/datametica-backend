import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JiraModule } from './JIRA/jira.module';

@Module({
  imports: [JiraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
