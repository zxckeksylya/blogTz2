import { Coment } from './coment.model';
import { Like } from './like.model';
export class Publication{
    
    constructor(
        public id?:string,
        public title?:string,
        public category?:string,
        public textOfBlog?:string,
        public idOfAuthor?:string,
        public coments?:Coment[],
        public likes?:Like[],
    ){}
}