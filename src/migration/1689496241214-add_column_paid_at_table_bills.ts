import { MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class addColumnPaidAtTableBills1689496241214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('bills', new TableColumn(
            {
                name: 'paid_at',
                type: 'bigint',
                isNullable: true,
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('bills', new TableColumn(
            {
                name: 'paid_at',
                type: 'bigint',
                isNullable: true,
            }
        ));
    }

}
