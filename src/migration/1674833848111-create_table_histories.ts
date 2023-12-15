import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateTableHistory1674833848111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "histories",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    length: "50",
                    isGenerated: true,
                    generationStrategy: "uuid",
                    isPrimary: true,
                }, {
                    name: "user_id",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                }, {
                    name: "water_usage",
                    type: "int",
                    isNullable: false,
                    default: "0",
                }, {
                    name: "unit",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                }, {
                    name: "start_date",
                    type: "bigint",
                    isNullable: false,
                }, {
                    name: "end_date",
                    type: "bigint",
                    isNullable: false,
                }, {
                    name: "nominal",
                    type: "int",
                    isNullable: true,
                }, {
                    name: "price_per_meter",
                    type: "int",
                    isNullable: true,
                }, {
                    name: "created_at",
                    type: "bigint",
                    isNullable: false,
                }
            ],
        }));
        await queryRunner.createIndex("histories", new TableIndex({
            name: "histories_user_id",
            columnNames: ["user_id"],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("histories", new TableIndex({
            name: "histories_user_id",
            columnNames: ["user_id"],
        }));
        await queryRunner.dropTable("histories");
    }

}
