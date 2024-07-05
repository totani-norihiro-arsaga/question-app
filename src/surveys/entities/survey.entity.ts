import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';

@Entity('surveys')
export class Survey {
    @PrimaryGeneratedColumn('uuid',{comment:'アンケートID'})
    id: string;

    @Column({type:'varchar', comment:'タイトル'})
    title: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @OneToMany(() => Question, (question) => question.survey)
    questions: Question[];

}