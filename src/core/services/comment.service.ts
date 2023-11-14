import { BaseService } from '@/core/services/base.service';
import { CommentModel } from '@/core/models/comment.model';
import AnswerService from "@/core/services/answer.service";
import axios from "axios";
import { config } from '@/core/utils/header-config';


export default class CategoryService extends BaseService<CommentModel>{

    constructor() {
        super("comment")
    }

    answerService = new AnswerService;

    async getComments() {
        const comments = await this.getAll();
        comments.data.forEach(async (comment: any) => {
            const answers = await this.answerService.getAnswers(comment._id);
            comment.answers_count = await answers.length;
            comment.answers = answers;
        });
        // console.log(comments)
        return comments;
    }

    async getComment(id: string) {
        const comment = await this.getById(id);
        const answers = await this.answerService.getAnswers(id);
        comment.answers = answers.reverse();
        comment.answers_count = await answers.length;
        return comment;

    }

    async saveComment(data: CommentModel) {
        try {
            const response = await axios.post(this.apiUrl, data, {
                headers: config
            })

            if (!localStorage.getItem("UserId")) {
                localStorage.setItem("UserId", JSON.stringify(response.data.Data.userId))
            }

            return response;
        }
        catch (error) {
            console.error.bind(console, "Error:")
        }

    }
}