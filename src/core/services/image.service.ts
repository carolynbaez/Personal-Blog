import { BaseService } from '@/core/services/base.service'
import { ImageModel } from '@/core/models/image.model'
import { config } from '@/core/utils/header-config'
import axios from 'axios'
import store from '@/store'

export default class CategoryService extends BaseService<ImageModel>{

    constructor() {
        super("image")
    }

    async addImage(image: any, place: string)
    {
        const response = await axios.post(this.apiUrl + place, image, {
            headers: {
                "Content-Type": "multipart/form-data",
                "token": store.state.token
            }
        });
        return response;
    }

    async getByPlace(place: string){
        const response = await axios.get(this.apiUrl + place, {
            headers: {
                "token": store.state.token
            }
        });
        return response.data;
    }
}