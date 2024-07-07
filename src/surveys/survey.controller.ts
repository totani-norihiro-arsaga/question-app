import { Body, Controller, Post } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { SurveyService } from "./service/survey.service";

@Controller('survey')
export class SurveyController {
    constructor(private readonly surveySurvice: SurveyService){}

    @Post('create')
    async create(@Body() createSurveyDto: CreateSurveyDto): Promise<string>
    {
        let result = await this.surveySurvice.create(createSurveyDto)
        console.log(result);
        return '成功しました。';
    }
}
