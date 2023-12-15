import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableConfig1674832236758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "configs",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                }, {
                    name: "name",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                }, {
                    name: "value",
                    type: "text",
                    isNullable: false,
                }
            ],
        }));

        await queryRunner.query(`INSERT INTO configs (id, name, value) VALUES ('1', 'unit', 'meter')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("configs");
    }

}
