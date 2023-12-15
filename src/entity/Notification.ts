import { Entity, PrimaryGeneratedColumn, Column, Long } from "typeorm"
import { NotificationType } from "../utils/NotificationUtil"

@Entity({
    name: "notifications",
})
export class Notification {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    user_id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    type: NotificationType

    @Column({
        default: 0
    })
    read_on: number

    @Column({
        nullable: false,
    })
    message_id: string

    @Column({
        default: +new Date()
    })
    created_at: number
}
