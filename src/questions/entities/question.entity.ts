import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import { Survey } from 'src/surveys/entities/survey.entity';
import { Choice } from './choice.entity';
import { MultipleChoiceResponse } from './multiple-choice-response.entity';

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn('increment',{comment:'質問ID'})
    id: number;

    @Column({type:'varchar', comment:'質問文'})
    question_text: string;
    
    @Column({type:'int', comment:'回答形式'})
    response_format: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @ManyToOne(() => Survey, (survey) => survey.questions)
    survey: Survey

    @OneToMany(() => Choice, (choice) => choice.question)
    choices: Choice[]

    @OneToMany(() => MultipleChoiceResponse, (multipleChoiceResponse) => multipleChoiceResponse.question)
    multipleChoiceResponses: MultipleChoiceResponse[]
}