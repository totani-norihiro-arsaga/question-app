import { Body, Controller, Post } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";

@Controller('survey')
export class SurveyController {
    @Post('create')
    create(@Body() createSurveyDto: CreateSurveyDto): string
    {
        console.log(createSurveyDto);
        return 'アンケート新規作成する。';
    }

}
