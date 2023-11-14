import axios from "axios";
import settings from "@/core/utils/app-settings";
import { config } from '@/core/utils/header-config';

export class BaseService<T> {
    public apiUrl: string;
    public controller: string;
    constructor(controller: string) {
        this.controller = controller;
        this.apiUrl = settings.API_URL + "/" + controller + "/";
    }

    public async getAll() {
        const response = await axios.get(this.apiUrl);
        return response;
    }

    public async getById(id: string | number) {
        const response = await axios.get<T>(this.apiUrl + id, {
            headers: config
        })
        return response.data;
    }

    public async delete(id: string | number) {
        const response = await axios.delete(this.apiUrl + id, {
            headers: config
        });
        return response;
    }

    public async post(data: T) {
        const response = await axios.post(this.apiUrl, data, {
            headers: config
        });
        return response;
    }

    public async put(data: T) {
        const response = await axios.put(this.apiUrl, data, {
            headers: config
        });
        return response;
    }
}