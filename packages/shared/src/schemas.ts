import { z } from "zod";
import {
  ReportCategory,
  ReportStatus,
  RideStatus,
  AlertCategory,
  AlertStatus,
  NotificationType,
  FlagTargetType,
  UserRole,
  AlertVote,
} from "./enums.js";

// --- Auth ---
export const OtpRequestSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
});

export const OtpVerifySchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  code: z
    .string()
    .length(6)
    .regex(/^\d{6}$/),
});

// --- User / Profile ---
export const UpdateMeSchema = z.object({
  fullName: z.string().min(2).max(60).trim().optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Must be a 10-digit Indian phone number")
    .optional()
    .nullable(),
  prefs: z.record(z.unknown()).optional(),
  termsAcceptedAt: z.string().datetime().optional(),
});

// --- Emergency contacts ---
export const CreateContactSchema = z.object({
  name: z.string().min(1).max(60).trim(),
  relationship: z.string().min(1).max(40).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z
    .string()
    .regex(/^\d{10}$/)
    .optional()
    .nullable(),
  consentConfirmed: z.literal(true, {
    errorMap: () => ({ message: "Contact consent is required" }),
  }),
});

export const UpdateContactSchema = CreateContactSchema.partial().omit({ consentConfirmed: true });

// --- Reports ---
export const CreateReportSchema = z.object({
  category: z.nativeEnum(ReportCategory),
  title: z.string().min(5).max(80).trim(),
  description: z.string().min(10).max(2000).trim(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  addressText: z.string().max(200).trim().optional(),
  photos: z
    .array(
      z.object({
        storageKey: z.string().min(1),
        url: z.string().url(),
        width: z.number().int().optional(),
        height: z.number().int().optional(),
      }),
    )
    .max(5)
    .optional(),
});

export const UpdateReportSchema = CreateReportSchema.partial();

export const ReportStatusChangeSchema = z.object({
  status: z.nativeEnum(ReportStatus),
  note: z.string().max(500).trim().optional(),
});

export const ReportListQuerySchema = z.object({
  category: z.nativeEnum(ReportCategory).optional(),
  status: z.nativeEnum(ReportStatus).optional(),
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  radius: z.coerce.number().min(0.1).max(50).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  mine: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

// --- Rides ---
export const CreateRideSchema = z.object({
  sourceText: z.string().min(2).max(200).trim(),
  sourceLat: z.number().min(-90).max(90),
  sourceLng: z.number().min(-180).max(180),
  destText: z.string().min(2).max(200).trim(),
  destLat: z.number().min(-90).max(90),
  destLng: z.number().min(-180).max(180),
  departureAt: z.string().datetime(),
  seatsTotal: z.number().int().min(1).max(3),
  estimatedTotalFare: z.number().int().min(10).max(5000),
  note: z.string().max(300).trim().optional(),
  womenOnly: z.boolean().optional(),
});

export const UpdateRideSchema = CreateRideSchema.partial();

export const CancelRideSchema = z.object({
  cancelReason: z.string().min(1).max(300).trim(),
});

export const RideRequestSchema = z.object({
  message: z.string().max(300).trim().optional(),
});

export const RideListQuerySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  date: z.string().optional(),
  seats: z.coerce.number().int().min(1).max(3).optional(),
  status: z.nativeEnum(RideStatus).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

// --- Journeys ---
export const CreateJourneySchema = z.object({
  destinationText: z.string().min(1).max(200).trim(),
  destLat: z.number().min(-90).max(90).optional(),
  destLng: z.number().min(-180).max(180).optional(),
  startText: z.string().max(200).trim().optional(),
  emergencyContactId: z.string().uuid(),
  expectedArrivalAt: z.string().datetime(),
  notes: z.string().max(500).trim().optional(),
  escalationMinutes: z.number().int().min(5).max(120).default(30),
});

export const ExtendJourneySchema = z.object({
  minutes: z.union([z.literal(15), z.literal(30)]),
});

// --- Alerts ---
export const CreateAlertSchema = z.object({
  category: z.nativeEnum(AlertCategory),
  description: z.string().min(10).max(1000).trim(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  addressText: z.string().max(200).trim().optional(),
  photoUrl: z.string().url().optional(),
  isAnonymous: z.boolean().default(false),
});

export const AlertVoteSchema = z.object({
  vote: z.nativeEnum(AlertVote),
});

export const AlertListQuerySchema = z.object({
  category: z.nativeEnum(AlertCategory).optional(),
  status: z.nativeEnum(AlertStatus).optional(),
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  radius: z.coerce.number().min(0.1).max(50).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const AlertSubscriptionSchema = z.object({
  enabled: z.boolean(),
  centerLat: z.number().min(-90).max(90),
  centerLng: z.number().min(-180).max(180),
  radiusKm: z.number().min(1).max(10),
  categories: z.array(z.nativeEnum(AlertCategory)).min(1),
  emailEnabled: z.boolean().default(false),
});

// --- Flags ---
export const CreateFlagSchema = z.object({
  targetType: z.nativeEnum(FlagTargetType),
  targetId: z.string().uuid(),
  reason: z.string().min(5).max(300).trim(),
});

// --- Notifications ---
export const NotificationListQuerySchema = z.object({
  unread: z.coerce.boolean().optional(),
  type: z.nativeEnum(NotificationType).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

// --- Admin ---
export const SuspendUserSchema = z.object({
  durationHours: z.number().int().min(1).max(8760),
  reason: z.string().min(5).max(500).trim(),
});

export const BanUserSchema = z.object({
  reason: z.string().min(5).max(500).trim(),
});

export const ChangeRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
  reason: z.string().min(5).max(500).trim(),
});

export const AlertStatusChangeSchema = z.object({
  status: z.nativeEnum(AlertStatus),
  note: z.string().max(500).trim().optional(),
});

export const FlagResolutionSchema = z.object({
  resolutionNote: z.string().max(500).trim().optional(),
});

// --- Uploads ---
export const SignUploadSchema = z.object({
  purpose: z.enum(["report", "alert", "avatar"]),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
});

// --- Common pagination ---
export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export type OtpRequestInput = z.infer<typeof OtpRequestSchema>;
export type OtpVerifyInput = z.infer<typeof OtpVerifySchema>;
export type UpdateMeInput = z.infer<typeof UpdateMeSchema>;
export type CreateContactInput = z.infer<typeof CreateContactSchema>;
export type CreateReportInput = z.infer<typeof CreateReportSchema>;
export type CreateRideInput = z.infer<typeof CreateRideSchema>;
export type CreateJourneyInput = z.infer<typeof CreateJourneySchema>;
export type CreateAlertInput = z.infer<typeof CreateAlertSchema>;
export type CreateFlagInput = z.infer<typeof CreateFlagSchema>;
