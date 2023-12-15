import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({
    name: "configs",
})
export class Config {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    value: string
    
}
