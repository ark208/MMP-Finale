// All database enums mirroring Prisma enums (Section 6.1)

export const UserRole = {
  USER: "USER",
  MODERATOR: "MODERATOR",
  ADMIN: "ADMIN",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  BANNED: "BANNED",
  DELETED: "DELETED",
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const ReportCategory = {
  BROKEN_STREETLIGHT: "BROKEN_STREETLIGHT",
  POOR_LIGHTING: "POOR_LIGHTING",
  POTHOLE: "POTHOLE",
  DAMAGED_ROAD: "DAMAGED_ROAD",
  DAMAGED_FOOTPATH: "DAMAGED_FOOTPATH",
  ISOLATED_AREA: "ISOLATED_AREA",
  OTHER: "OTHER",
} as const;
export type ReportCategory = (typeof ReportCategory)[keyof typeof ReportCategory];

export const ReportStatus = {
  SUBMITTED: "SUBMITTED",
  UNDER_REVIEW: "UNDER_REVIEW",
  VERIFIED: "VERIFIED",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
} as const;
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];

export const RideStatus = {
  OPEN: "OPEN",
  FULL: "FULL",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;
export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus];

export const RideRequestStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
} as const;
export type RideRequestStatus = (typeof RideRequestStatus)[keyof typeof RideRequestStatus];

export const JourneyStatus = {
  ACTIVE: "ACTIVE",
  OVERDUE: "OVERDUE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;
export type JourneyStatus = (typeof JourneyStatus)[keyof typeof JourneyStatus];

export const AlertCategory = {
  ROAD_ACCIDENT: "ROAD_ACCIDENT",
  MEDICAL: "MEDICAL",
  HARASSMENT: "HARASSMENT",
  FIRE: "FIRE",
  PUBLIC_HAZARD: "PUBLIC_HAZARD",
  OTHER: "OTHER",
} as const;
export type AlertCategory = (typeof AlertCategory)[keyof typeof AlertCategory];

export const AlertStatus = {
  ACTIVE: "ACTIVE",
  VERIFIED: "VERIFIED",
  RESOLVED: "RESOLVED",
  DISMISSED: "DISMISSED",
  EXPIRED: "EXPIRED",
  REMOVED: "REMOVED",
} as const;
export type AlertStatus = (typeof AlertStatus)[keyof typeof AlertStatus];

export const NotificationType = {
  REPORT_STATUS: "REPORT_STATUS",
  REPORT_CONFIRMED: "REPORT_CONFIRMED",
  RIDE_REQUEST: "RIDE_REQUEST",
  RIDE_DECISION: "RIDE_DECISION",
  RIDE_UPDATE: "RIDE_UPDATE",
  RIDE_MESSAGE: "RIDE_MESSAGE",
  JOURNEY_REMINDER: "JOURNEY_REMINDER",
  JOURNEY_OVERDUE: "JOURNEY_OVERDUE",
  ALERT_NEARBY: "ALERT_NEARBY",
  ALERT_UPDATE: "ALERT_UPDATE",
  MODERATION: "MODERATION",
  SYSTEM: "SYSTEM",
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export const FlagTargetType = {
  REPORT: "REPORT",
  RIDE: "RIDE",
  ALERT: "ALERT",
  USER: "USER",
  RIDE_MESSAGE: "RIDE_MESSAGE",
} as const;
export type FlagTargetType = (typeof FlagTargetType)[keyof typeof FlagTargetType];

export const FlagStatus = {
  OPEN: "OPEN",
  ACTIONED: "ACTIONED",
  DISMISSED: "DISMISSED",
} as const;
export type FlagStatus = (typeof FlagStatus)[keyof typeof FlagStatus];

export const AlertVote = {
  CONFIRM: "CONFIRM",
  DISPUTE: "DISPUTE",
} as const;
export type AlertVote = (typeof AlertVote)[keyof typeof AlertVote];

export const JourneyEventType = {
  STARTED: "STARTED",
  EXTENDED: "EXTENDED",
  REMINDER_SENT: "REMINDER_SENT",
  CONTACT_NOTIFIED: "CONTACT_NOTIFIED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;
export type JourneyEventType = (typeof JourneyEventType)[keyof typeof JourneyEventType];

export const ModerationActionType = {
  VERIFY: "VERIFY",
  REJECT: "REJECT",
  REMOVE: "REMOVE",
  SUSPEND: "SUSPEND",
  BAN: "BAN",
  RESTORE: "RESTORE",
  ROLE_CHANGE: "ROLE_CHANGE",
  STRIKE: "STRIKE",
  WARN: "WARN",
  RESOLVE: "RESOLVE",
  DISMISS: "DISMISS",
} as const;
export type ModerationActionType = (typeof ModerationActionType)[keyof typeof ModerationActionType];
