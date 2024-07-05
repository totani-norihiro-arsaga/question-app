import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import { Question } from './question.entity';
import { MultipleChoiceResponse } from './multiple-choice-response.entity';

@Entity('choices')
export class Choice {
    @PrimaryGeneratedColumn('increment',{comment:'選択肢ID'})
    id: number;

    @Column({type:'varchar', comment:'選択肢文言'})
    choice_text: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @ManyToOne(() => Question, (question) => question.choices)
    question: Question

    @OneToMany(() => MultipleChoiceResponse, (multipleChoiceResponse) => multipleChoiceResponse.choice)
    multipleChoiceResponses: MultipleChoiceResponse[];
}