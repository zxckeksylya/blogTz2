export class Publication{
    
    constructor(
        public id?:string,
        public title?:string,
        public category?:string,
        public textOfBlog?:string,
        public countOfLikes?:number,
        //public coments?:Coment[],
    ){}
}