import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateTableNotifications1674832644676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "notifications",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    length: "50",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid",
                }, {
                    name: "user_id",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                }, {
                    name: "title",
                    type: "text",
                    isNullable: false,
                }, {
                    name: "description",
                    type: "text",
                    isNullable: true,
                }, {
                    name: "type",
                    type: "varchar",
                    default: "25",
                    isNullable: false
                }, {
                    name: "read_on",
                    type: "bigint",
                    default: "0",
                    isNullable: false,
                }, {
                    name: "message_id",
                    type: "text",
                    isNullable: false,
                }, {
                    name: "created_at",
                    type: "bigint",
                    isNullable: false,
                }
            ],
        }));

        await queryRunner.createIndex("notifications", new TableIndex({
            name: "notifications_user_id",
            columnNames: ["user_id"],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("notifications", new TableIndex({
            name: "notifications_user_id",
            columnNames: ["user_id"],
        }));
        await queryRunner.dropTable("notifications");
    }

}
