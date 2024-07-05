import {Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm';
import { Question } from './question.entity';
import { Choice } from './choice.entity';

@Entity('multiple_choice_responses')
export class MultipleChoiceResponse {
    @PrimaryGeneratedColumn('increment',{comment:'回答ID'})
    id: number;

    @CreateDateColumn()
    createdDate: Date

    @ManyToOne(() => Choice, (choice) => choice.multipleChoiceResponses)
    choice: Choice
    
    @ManyToOne(() => Question, (question) => question.multipleChoiceResponses)
    question: Question
}