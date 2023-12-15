import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { testPush } from "../controllers/NotificationController";

export class CreateTableUsers1674832237235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    length: "50",
                    isGenerated: true,
                    generationStrategy: "uuid",
                    isPrimary: true,
                }, {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isUnique: true,
                    isNullable: false,
                }, {
                    name: "password",
                    type: "text",
                    isNullable: false,
                }, {
                    name: "firstname", 
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                }, {
                    name: "lastname", 
                    type: "varchar",
                    length: "100",
                    isNullable: false,
                }, {
                    name: "address",
                    type: "text",
                    isNullable: false,
                }, {
                    name: "latitude",
                    type: "float",
                    isNullable: true,
                }, {
                    name: "longitude",
                    type: "float",
                    isNullable: true,
                }, {
                    // superadmin, officer, customer, none
                    name: "role",
                    type: "varchar",
                    length: "25",
                    isNullable: false,
                }, {
                    name: "treshold_system",
                    type: "varchar",
                    length: "10",
                    isNullable: false,
                    default: `"off"`,
                }, {
                    name: "treshold",
                    type: "int",
                    isNullable: false,
                    default: 0,
                }, {
                    name: "price_per_meter",
                    type: "int",
                    isNullable: false,
                    default: 0,
                }, {
                    name: "last_on",
                    type: "bigint",
                    isNullable: true,
                }, {
                    name: "is_active",
                    type: "int",
                    isNullable: false,
                    default: 1,
                }, {
                    name: "created_at",
                    type: "bigint",
                    isNullable: false,
                }, {
                    name: "updated_at",
                    type: "bigint",
                    isNullable: true,
                }
            ],
        }));
        
        await queryRunner.query(`INSERT INTO users (id, email, password, firstname, lastname, address, latitude, longitude, role, treshold_system, treshold, price_per_meter, last_on, is_active, created_at) 
            VALUES ('9d0a806d-0fd5-4558-bedf-f9e5a660a246', 'unknown@app.com', 'password', 'unknown', 'unknown', 'unknown', 0, 0, 'UNKNOWN', 'off', 0, 0, 0, 1, 1681396273638)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
