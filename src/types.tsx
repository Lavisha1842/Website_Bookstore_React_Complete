// Contains all the custom types we want to use for our application
import Classics from './assets/images/categories/classics.gif';
import Fantasy from './assets/images/categories/fantasy.gif';
import Mystery from './assets/images/categories/mystery.gif';
import Romance from './assets/images/categories/romance.gif';
import Fiction from './assets/images/categories/fiction.gif';
import Biography from './assets/images/categories/biography.gif';
export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  quantity?: number;
  categoryId:number;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}
export const categoryImages: Record<string, any> = {
  classics: Classics,
  fantasy : Fantasy,
  romance : Romance,
  fiction: Fiction,
  mystery : Mystery,
  biography: Biography
};

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}

export interface ContextProps {
  children: JSX.Element | JSX.Element[]
}


export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Customer {
  customerName: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpDate: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

// export interface OrderDetails {
//   order: Order;
//   customer: CustomerForm;
//   books: BookItem[];
// }

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}

export interface LineItem {
  bookId: number;
  orderId: number;
  quantity: number;
}



export interface OrderDetails {
  order: Order;
  customer: Customer;
  books: BookItem[];
  lineItems: LineItem[];
}

// export interface CatProp{
//   catList:CategoryItem[];
// }
