import "reflect-metadata"
import { DataSource } from "typeorm"
import { Bill } from "./entity/Bill"
import { History } from "./entity/History"
import { Config } from "./entity/Config"
import { Notification } from "./entity/Notification"
import { WaterUsage } from "./entity/WaterUsage"

import { CreateTableConfig1674832236758 } from "./migration/1674832236758-create_table_configs";
import { CreateTableWaterUsage1674832638265 } from "./migration/1674832638265-create_table_water_usages";
import { CreateTableNotifications1674832644676 } from "./migration/1674832644676-create_table_notifications"
import { createTableBills1674833432610 } from "./migration/1674833432610-create_table_bills";
import { CreateTableHistory1674833848111 } from "./migration/1674833848111-create_table_histories"
import { CreateTableUsers1674832237235 } from "./migration/1674832237235-create_table_users"

import * as dotenv from "dotenv";
import { User } from "./entity/User"
import { AddDemoUser1685606748550 } from "./migration/1685606748550-add_demo_user"
import { AddUserTresholdCounter1685806124911 } from "./migration/1685806124911-add_user_treshold_counter"
import { AddColumnStatusBill1686459862504 } from "./migration/1686459862504-add column status bill"
import { addColumnPaidAtTableBills1689496241214 } from "./migration/1689496241214-add_column_paid_at_table_bills"
import { changeColumnWaterUsageHistoriesAndBills1693413642871 } from "./migration/1693413642871-change_column_water_usage_histories_and_bills"
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [
        Config,
        User,
        WaterUsage,
        Notification,
        History,
        Bill,
    ],
    migrations: [
        CreateTableConfig1674832236758,
        CreateTableUsers1674832237235,
        CreateTableWaterUsage1674832638265,
        CreateTableNotifications1674832644676,
        createTableBills1674833432610,
        CreateTableHistory1674833848111,
        AddDemoUser1685606748550,
        AddUserTresholdCounter1685806124911,
        AddColumnStatusBill1686459862504,
        addColumnPaidAtTableBills1689496241214,
        changeColumnWaterUsageHistoriesAndBills1693413642871
    ],
    subscribers: [],
})
