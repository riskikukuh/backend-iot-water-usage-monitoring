import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class changeColumnWaterUsageHistoriesAndBills1693413642871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('histories', new TableColumn({
                name: 'water_usage',
                type: 'int'
            }), new TableColumn({
                name: 'water_usage',
                type: 'double'
            })
        );
        await queryRunner.changeColumn('bills', new TableColumn({
                name: 'water_usage',
                type: 'bigint'
            }), new TableColumn({
                name: 'water_usage',
                type: 'double'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('histories', new TableColumn({
                name: 'water_usage',
                type: 'double'
            }), new TableColumn({
                name: 'water_usage',
                type: 'int'
            })
        );
        await queryRunner.changeColumn('bills', new TableColumn({
                name: 'water_usage',
                type: 'double'
            }), new TableColumn({
                name: 'water_usage',
                type: 'bigint'
            })
        );
    }

}
