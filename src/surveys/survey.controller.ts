import { Body, Controller, Post } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { SurveyService } from "./service/survey.service";
import { QuestionService } from "src/questions/services/question/question.service";
import { DataSource} from "typeorm";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('survey')
export class SurveyController {
    constructor(
        private readonly surveyService: SurveyService,
        private readonly questionService: QuestionService,
        private readonly dataSource: DataSource,
    ){}

    @Post('create')
    @ApiOperation({summary:'新しいアンケートを作成する。'})
    @ApiResponse({status:201, description:'新しいアンケートを作成しました。'})
    @ApiResponse({status:400, description:'リクエストエラーです。'})
    @ApiResponse({status:500, description:'サーバーエラーが発生しました。'})
    async create(@Body() createSurveyDto: CreateSurveyDto): Promise<void>
    {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const survey = await this.surveyService.create(createSurveyDto, manager);
            createSurveyDto.question.survey_id = survey.id;
            await this.questionService.create(createSurveyDto.question, manager);
            await queryRunner.commitTransaction();
            console.info('成功しました。');
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(`失敗しました。:${error.message}`)
        } finally {
            return queryRunner.release();
        }
    }
}
