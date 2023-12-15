import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ 
    name: "users"
})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
    })
    email: string

    @Column()
    password: string
    
    @Column()
    firstname: string
    
    @Column()
    lastname: string

    @Column()
    address: string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column({
        default: 'CUSTOMER',
    })
    role: string

    @Column({
        default: 'off',
    })
    treshold_system: string

    @Column({
        default: 0,
    })
    treshold: number

    @Column({
        default: 0,
    })
    treshold_counter: number

    @Column({
        default: 0,
    })
    price_per_meter: number

    @Column({
        default: 1
    })
    is_active: number
    
    @Column({
        default: +new Date()
    })
    created_at: number

}
