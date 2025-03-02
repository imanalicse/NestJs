import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./Order";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ name: 'created_at', nullable: true})
    createdAt: Date

    @Column({ name: 'updated_at', nullable: true })
    updatedAt: Date

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}