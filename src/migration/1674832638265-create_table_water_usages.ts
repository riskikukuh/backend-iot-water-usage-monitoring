import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateTableWaterUsage1674832638265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "water_usages",
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
                },{
                    name: "usage",
                    type: "double",
                    isNullable: false,
                    default: "0",
                }, {
                    name: "unit",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                }, {
                    name: "usage_at",
                    type: "bigint",
                    isNullable: false,
                }, {
                    name: "created_at",
                    type: "bigint",
                    isNullable: false,
                }
            ],
        }));

        await queryRunner.createIndex("water_usages", new TableIndex({
            name: "water_usages_user_id",
            columnNames: ["user_id"],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("water_usages", new TableIndex({
            name: "water_usages_user_id",
            columnNames: ["user_id"],
        }));
        await queryRunner.dropTable("water_usages");
    }

}
