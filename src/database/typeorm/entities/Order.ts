import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn()
    id: bigint

    @Column()
    product_name: string

    @Column()
    price: number

    @Column({ name: 'created_at', nullable: true})
    createdAt: Date

    @Column({ name: 'updated_at', nullable: true })
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.orders)
    user: User;
}