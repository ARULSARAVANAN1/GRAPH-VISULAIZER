import { Book } from "src/app/shared/interfaces/book";

export interface Cart {
    cartId:string;
    book:Book;
    quantity:number;
    price:number;
}
