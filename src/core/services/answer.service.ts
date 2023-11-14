import { BaseService } from '@/core/services/base.service';
import { AnswerModel } from '@/core/models/answer.model';
import axios from "axios";
import { config } from '@/core/utils/header-config';

export default class CategoryService extends BaseService<AnswerModel>{

    constructor() {
        super("answer")
    }

    async saveAnswer(data: AnswerModel) {
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

    async getAnswers(comment: string) {
        try {
            const response = await axios.get(`${this.apiUrl}${comment}`, {
                headers: config
            })
            return response.data;
        }
        catch (error) {
            console.error.bind(console, "Error:")
        }

    }
}