import { Entity, PrimaryGeneratedColumn, Column, Long, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity({
    name: "bills",
})
export class Bill {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    user_id: string

    @Column('decimal')
    water_usage: number

    @Column()
    unit: string

    @Column()
    start_date: number

    @Column()
    end_date: number

    @Column()
    nominal: number

    @Column()
    price_per_meter: number

    @Column()
    status: string

    @Column()
    paid_at: number

    @Column({
        default: +new Date()
    })
    created_at: number

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id'})
    user: User
}
