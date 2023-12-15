import { Entity, PrimaryGeneratedColumn, Column, Long } from "typeorm"

@Entity({
    name: "histories",
})
export class History {

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

    @Column({
        nullable: true,
    })
    nominal: number

    @Column({
        nullable: true,
    })
    price_per_meter: number

    @Column({
        default: +new Date()
    })
    created_at: number

}
