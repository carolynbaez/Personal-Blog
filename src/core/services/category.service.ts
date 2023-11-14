import { BaseService } from '@/core/services/base.service'
import { CategoryModel } from '@/core/models/category.model'

export default class CategoryService extends BaseService<CategoryModel>{

    constructor() {
        super("category")
    }
}