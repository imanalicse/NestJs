import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number

    @Column({ name: 'refresh_token', unique: true })
    refreshToken: string

    @Column({ name: 'expired_at' })
    expiredAt: Date

    @Column({ name: 'created_at', nullable: true })
    createdAt: Date

    @Column({ name: 'updated_at', nullable: true })
    updatedAt: Date

    @OneToOne(() => User, (user) => user.refreshToken, { cascade: true})
    @JoinColumn({name: 'user_id'}) // This column will hold the foreign key
    user: User;
}