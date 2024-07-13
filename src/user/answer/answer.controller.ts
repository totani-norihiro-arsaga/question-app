import { Controller, Get } from '@nestjs/common';

@Controller('answer')
export class AnswerController {
    @Get('create')
    async create() {
        
    }
}
