import { Body, Controller, Post } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { SurveyService } from "./service/survey.service";
import { QuestionService } from "src/questions/services/question/question.service";
import { DataSource} from "typeorm";

@Controller('survey')
export class SurveyController {
    constructor(
        private readonly surveyService: SurveyService,
        private readonly questionService: QuestionService,
        private readonly dataSource: DataSource,
    ){}

    @Post('create')
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
            console.log('成功しました。');
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error)
            console.log('失敗しました。');
        } finally {
            return queryRunner.release();
        }
    }
}
