import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddUserTresholdCounter1685806124911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn(
            {
                name: 'treshold_counter',
                type: 'int',
                default: 0,
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', new TableColumn(
            {
                name: 'treshold_counter',
                type: 'int',
                default: 0,
            }
        ));
    }

}
