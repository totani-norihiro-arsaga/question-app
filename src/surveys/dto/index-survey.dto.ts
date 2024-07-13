import { ApiProperty } from "@nestjs/swagger";
import { Survey } from "../entities/survey.entity";

export class IndexSurveyDto{
    @ApiProperty({type:Array<Survey>, example: [{"id":"17e4a9cc-643d-4fb5-8b98-28b95734d740","title":"dffggh","createdDate":"2024-07-14T17:33:33.458Z","updatedDate":"2024-07-14T17:33:33.458Z","questions":[{"id":44,"questionText":"ddd","responseFormat":1,"createdDate":"2024-07-14T17:33:33.480Z","updatedDate":"2024-07-14T17:33:33.480Z","surveyId":"17e4a9cc-643d-4fb5-8b98-28b95734d740","choices":[{"id":26,"choiceText":"テスト選択肢","createdDate":"2024-07-14T17:33:33.485Z","updatedDate":"2024-07-14T17:33:33.485Z","questionId":44}]}]}]})
    data:Survey[];
    @ApiProperty({type:Number,example:2, description:'現在のページ数'})
    current:number;
    @ApiProperty({type:Number, example:100, description:'データのトータル件数'})
    total:number;

    constructor(data:Survey[], current:number, total:number) {
        this.data = data;
        this.current = current;
        this.total = total;
    }
}