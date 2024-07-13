import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { MultipleChoiceResponse } from './multiple-choice-response.entity';

@Entity('choices')
export class Choice {
  @PrimaryGeneratedColumn('increment', { comment: '選択肢ID' })
  id: number;

  @Column({ type: 'varchar', comment: '選択肢文言' })
  choiceText: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Question, (question) => question.choices)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column({ type: 'number', nullable: true })
  questionId: number;

  @OneToMany(
    () => MultipleChoiceResponse,
    (multipleChoiceResponse) => multipleChoiceResponse.choice,
  )
  multipleChoiceResponses: MultipleChoiceResponse[];
}
