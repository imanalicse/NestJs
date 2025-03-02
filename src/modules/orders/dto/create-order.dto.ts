import {Column} from "typeorm";

export class CreateOrderDto {
    @Column()
    product_name: string

    @Column()
    price: number
}