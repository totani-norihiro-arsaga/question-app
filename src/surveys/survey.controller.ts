import { Body, Controller, Post } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { SurveyService } from "./service/survey.service";
import { QuestionService } from "src/questions/services/question/question.service";

@Controller('survey')
export class SurveyController {
    constructor(
        private readonly surveyService: SurveyService,
        private readonly questionService: QuestionService
    ){}

    @Post('create')
    async create(@Body() createSurveyDto: CreateSurveyDto): Promise<string>
    {
        console.log('aa');
        let survey = await this.surveyService.create(createSurveyDto);
        createSurveyDto.question.survey_id = survey.id;
        console.log(survey);
        await this.questionService.create(createSurveyDto.question);

        return '成功しました。';
    }
}
