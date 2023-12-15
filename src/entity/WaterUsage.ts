import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ 
    name: "water_usages"
})
export class WaterUsage {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    user_id: string

    @Column('decimal')
    usage: number

    @Column()
    unit: string

    @Column()
    usage_at: number
    
    @Column({
        default: +new Date()
    })
    created_at: number

}
