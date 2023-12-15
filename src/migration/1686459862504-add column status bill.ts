import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumnStatusBill1686459862504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Status bill
        // UNPAID, PAID
        await queryRunner.addColumn('bills', new TableColumn(
            {
                name: 'status',
                type: 'varchar',
                length: "100",
                default: "'UNPAID'",
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('bills', new TableColumn(
            {
                name: 'status',
                type: 'varchar',
                length: "100"
            }
        ));
    }

}
