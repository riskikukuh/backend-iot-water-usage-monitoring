import { MigrationInterface, QueryRunner } from "typeorm"

export class AddDemoUser1685606748550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO users (id, email, password, firstname, lastname, address, latitude, longitude, role, treshold_system, treshold, price_per_meter, last_on, is_active, created_at) 
            VALUES ('f3f28329-df95-4e4a-959e-a3fcb55620a0', 'petugas@app.com', 'password', 'Petugas 1', '', 'Karanglo RT 6 RW 6 Jeruksawit, Gondangrejo, Karanganyar', 0, 0, 'OFFICER', 'off', 0, 0, 0, 1, 1681396273639)`);

        await queryRunner.query(`INSERT INTO users (id, email, password, firstname, lastname, address, latitude, longitude, role, treshold_system, treshold, price_per_meter, last_on, is_active, created_at) 
            VALUES ('c47158fd-069d-40ae-bb10-9bdfe1b6fd56', 'pelanggan@app.com', 'password', 'Pelanggan 1', '', 'Karanglo RT 6 RW 6 Jeruksawit, Gondangrejo, Karanganyar', 0, 0, 'CUSTOMER', 'off', 0, 1500, 0, 1, 1681396273640)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users WHERE id = 'f3f28329-df95-4e4a-959e-a3fcb55620a0'`);
        await queryRunner.query(`DELETE FROM users WHERE id = 'c47158fd-069d-40ae-bb10-9bdfe1b6fd56'`);
    }

}
