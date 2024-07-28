import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Question } from './question.entity';
import { Choice } from './choice.entity';

@Entity('multiple_choice_responses')
export class MultipleChoiceResponse {
  @PrimaryGeneratedColumn('increment', { comment: '回答ID' })
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => Choice, (choice) => choice.multipleChoiceResponses)
  @JoinColumn({ name: 'choiceId' })
  choice: Choice;
  @Column({ type: 'number', nullable: true })
  choiceId: number;

  @ManyToOne(() => Question, (question) => question.multipleChoiceResponses)
  @JoinColumn({ name: 'questionId' })
  question: Question;
  @Column({ type: 'number', nullable: true })
  questionId: number;
}
