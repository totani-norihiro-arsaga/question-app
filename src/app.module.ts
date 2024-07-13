import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './admin/question/question.module';
import configurations from './config/configuration';
import { SurveyMdule } from './admin/survey/survery.module';
import { DatabaseModule } from './database/database.module';
import { AnswerModule } from './user/answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: configurations }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: ['dist/**/entities/**/*.entity.js'],
      }),
    }),
    QuestionModule,
    SurveyMdule,
    DatabaseModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
