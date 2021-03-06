/**
 * YouthStat API
 * Core api for the YouthStat application
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { UserSubscription } from './userSubscription';


export interface UserProfile {
    email?: string;
    subscriptions?: Array<UserSubscription>;
}
