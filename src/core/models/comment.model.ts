import { AnswerModel } from './answer.model';

export class CommentModel {
    userName: string = "";
    description: string = "";
    deleted: boolean = false;
    answers: AnswerModel[] = [];
    answers_count: number = 0;
    userId: string = ""
}

