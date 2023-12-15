import { IsBoolean, IsBooleanString, IsEnum, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsUUID, Matches, } from "class-validator";
import { NotificationType } from "../NotificationUtil";

class ReadNotificationValidator {
    @IsNotEmpty()
    @IsUUID()
    notificationId: string
}

class GetNotificationsValidator {
    
    @IsOptional()
    @IsIn([NotificationType.ALERT, NotificationType.REMINDER])
    type: string

    @IsOptional()
    @IsBooleanString()
    read: boolean | null

    typeStrToNotifType(): NotificationType {
        return this.type == NotificationType.ALERT ? NotificationType.ALERT : NotificationType.ALERT;
    }
}

export {
    GetNotificationsValidator,
    ReadNotificationValidator,
}