import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Survey } from 'src/surveys/entities/survey.entity';
import { Choice } from './choice.entity';
import { MultipleChoiceResponse } from './multiple-choice-response.entity';
import { ResponseTypes } from '../ enums/ResponseTypes';
import { UUID } from 'crypto';

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn('increment',{comment:'質問ID'})
    id: number;

    @Column({type:'varchar', comment:'質問文'})
    questionText: string;
    
    @Column({type:'int', comment:'回答形式'})
    responseFormat: ResponseTypes;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @ManyToOne(() => Survey, (survey) => survey.questions)
    @JoinColumn({name: 'surveyId'})
    survey: Survey

    @Column({type:'uuid' ,nullable: true })
    surveyId: UUID;

    @OneToMany(() => Choice, (choice) => choice.question)
    choices: Choice

    @OneToMany(() => MultipleChoiceResponse, (multipleChoiceResponse) => multipleChoiceResponse.question)
    multipleChoiceResponses: MultipleChoiceResponse
}