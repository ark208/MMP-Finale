-- Enable citext extension
CREATE EXTENSION IF NOT EXISTS citext;

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'BANNED', 'DELETED');

-- CreateEnum
CREATE TYPE "ReportCategory" AS ENUM ('BROKEN_STREETLIGHT', 'POOR_LIGHTING', 'POTHOLE', 'DAMAGED_ROAD', 'DAMAGED_FOOTPATH', 'ISOLATED_AREA', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'VERIFIED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('OPEN', 'FULL', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RideRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "JourneyStatus" AS ENUM ('ACTIVE', 'OVERDUE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "JourneyEventType" AS ENUM ('STARTED', 'EXTENDED', 'REMINDER_SENT', 'CONTACT_NOTIFIED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AlertCategory" AS ENUM ('ROAD_ACCIDENT', 'MEDICAL', 'HARASSMENT', 'FIRE', 'PUBLIC_HAZARD', 'OTHER');

-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('ACTIVE', 'VERIFIED', 'RESOLVED', 'DISMISSED', 'EXPIRED', 'REMOVED');

-- CreateEnum
CREATE TYPE "AlertVote" AS ENUM ('CONFIRM', 'DISPUTE');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('REPORT_STATUS', 'REPORT_CONFIRMED', 'RIDE_REQUEST', 'RIDE_DECISION', 'RIDE_UPDATE', 'RIDE_MESSAGE', 'JOURNEY_REMINDER', 'JOURNEY_OVERDUE', 'ALERT_NEARBY', 'ALERT_UPDATE', 'MODERATION', 'SYSTEM');

-- CreateEnum
CREATE TYPE "FlagTargetType" AS ENUM ('REPORT', 'RIDE', 'ALERT', 'USER', 'RIDE_MESSAGE');

-- CreateEnum
CREATE TYPE "FlagStatus" AS ENUM ('OPEN', 'ACTIONED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "ModerationActionType" AS ENUM ('VERIFY', 'REJECT', 'REMOVE', 'SUSPEND', 'BAN', 'RESTORE', 'ROLE_CHANGE', 'STRIKE', 'WARN', 'RESOLVE', 'DISMISS');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" CITEXT NOT NULL,
    "email_verified_at" TIMESTAMPTZ,
    "full_name" VARCHAR(60),
    "phone" VARCHAR(15),
    "avatar_url" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "terms_accepted_at" TIMESTAMPTZ,
    "strike_count" INTEGER NOT NULL DEFAULT 0,
    "alerts_suspended_until" TIMESTAMPTZ,
    "prefs" JSONB,
    "last_login_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_codes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" CITEXT NOT NULL,
    "code_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "consumed_at" TIMESTAMPTZ,
    "ip" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "user_agent" TEXT,
    "ip" TEXT,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "revoked_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_contacts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "relationship" VARCHAR(40) NOT NULL,
    "email" CITEXT NOT NULL,
    "phone" VARCHAR(15),
    "consent_confirmed" BOOLEAN NOT NULL,
    "unsubscribed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "emergency_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "author_id" UUID NOT NULL,
    "category" "ReportCategory" NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "address_text" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'SUBMITTED',
    "confirmation_count" INTEGER NOT NULL DEFAULT 0,
    "moderator_note" TEXT,
    "resolved_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "report_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "storage_key" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "report_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_confirmations" (
    "report_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_confirmations_pkey" PRIMARY KEY ("report_id","user_id")
);

-- CreateTable
CREATE TABLE "report_status_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "report_id" UUID NOT NULL,
    "from_status" "ReportStatus" NOT NULL,
    "to_status" "ReportStatus" NOT NULL,
    "changed_by" UUID NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rides" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "creator_id" UUID NOT NULL,
    "source_text" TEXT NOT NULL,
    "source_lat" DECIMAL(9,6) NOT NULL,
    "source_lng" DECIMAL(9,6) NOT NULL,
    "dest_text" TEXT NOT NULL,
    "dest_lat" DECIMAL(9,6) NOT NULL,
    "dest_lng" DECIMAL(9,6) NOT NULL,
    "departure_at" TIMESTAMPTZ NOT NULL,
    "seats_total" SMALLINT NOT NULL,
    "seats_taken" SMALLINT NOT NULL DEFAULT 0,
    "estimated_total_fare" INTEGER NOT NULL,
    "note" TEXT,
    "women_only" BOOLEAN NOT NULL DEFAULT false,
    "status" "RideStatus" NOT NULL DEFAULT 'OPEN',
    "cancel_reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "rides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ride_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ride_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "message" TEXT,
    "status" "RideRequestStatus" NOT NULL DEFAULT 'PENDING',
    "decided_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ride_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ride_participants" (
    "ride_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "joined_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "left_at" TIMESTAMPTZ,

    CONSTRAINT "ride_participants_pkey" PRIMARY KEY ("ride_id","user_id")
);

-- CreateTable
CREATE TABLE "ride_messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ride_id" UUID NOT NULL,
    "sender_id" UUID NOT NULL,
    "body" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ride_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journeys" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "emergency_contact_id" UUID NOT NULL,
    "destination_text" TEXT NOT NULL,
    "dest_lat" DECIMAL(9,6),
    "dest_lng" DECIMAL(9,6),
    "start_text" TEXT,
    "notes" TEXT,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expected_arrival_at" TIMESTAMPTZ NOT NULL,
    "extensions_used" SMALLINT NOT NULL DEFAULT 0,
    "status" "JourneyStatus" NOT NULL DEFAULT 'ACTIVE',
    "overdue_at" TIMESTAMPTZ,
    "contact_notified_at" TIMESTAMPTZ,
    "completed_at" TIMESTAMPTZ,
    "track_token_hash" TEXT,
    "track_token_expires_at" TIMESTAMPTZ,
    "escalation_minutes" INTEGER NOT NULL DEFAULT 30,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "journeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journey_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "journey_id" UUID NOT NULL,
    "type" "JourneyEventType" NOT NULL,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "journey_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "author_id" UUID NOT NULL,
    "category" "AlertCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "address_text" TEXT,
    "photo_url" TEXT,
    "status" "AlertStatus" NOT NULL DEFAULT 'ACTIVE',
    "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
    "confirm_count" INTEGER NOT NULL DEFAULT 0,
    "dispute_count" INTEGER NOT NULL DEFAULT 0,
    "needs_review_first" BOOLEAN NOT NULL DEFAULT false,
    "verified_by" UUID,
    "resolved_at" TIMESTAMPTZ,
    "expires_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alert_votes" (
    "alert_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "vote" "AlertVote" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alert_votes_pkey" PRIMARY KEY ("alert_id","user_id")
);

-- CreateTable
CREATE TABLE "alert_subscriptions" (
    "user_id" UUID NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "center_lat" DECIMAL(9,6) NOT NULL,
    "center_lng" DECIMAL(9,6) NOT NULL,
    "radius_km" DECIMAL(4,2) NOT NULL,
    "categories" "AlertCategory"[],
    "email_enabled" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alert_subscriptions_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "link" TEXT,
    "data" JSONB,
    "read_at" TIMESTAMPTZ,
    "email_sent_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reporter_id" UUID NOT NULL,
    "target_type" "FlagTargetType" NOT NULL,
    "target_id" UUID NOT NULL,
    "reason" VARCHAR(300) NOT NULL,
    "status" "FlagStatus" NOT NULL DEFAULT 'OPEN',
    "resolved_by" UUID,
    "resolution_note" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moderation_actions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "actor_id" UUID NOT NULL,
    "action" "ModerationActionType" NOT NULL,
    "target_type" TEXT NOT NULL,
    "target_id" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "meta" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moderation_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updated_by" UUID,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "otp_codes_email_created_at_idx" ON "otp_codes"("email", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_hash_key" ON "sessions"("token_hash");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "emergency_contacts_user_id_email_key" ON "emergency_contacts"("user_id", "email");

-- CreateIndex
CREATE INDEX "reports_status_created_at_idx" ON "reports"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "reports_category_idx" ON "reports"("category");

-- CreateIndex
CREATE INDEX "reports_latitude_longitude_idx" ON "reports"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "reports_author_id_idx" ON "reports"("author_id");

-- CreateIndex
CREATE INDEX "report_status_history_report_id_idx" ON "report_status_history"("report_id");

-- CreateIndex
CREATE INDEX "rides_status_departure_at_idx" ON "rides"("status", "departure_at");

-- CreateIndex
CREATE INDEX "rides_source_lat_source_lng_idx" ON "rides"("source_lat", "source_lng");

-- CreateIndex
CREATE INDEX "rides_dest_lat_dest_lng_idx" ON "rides"("dest_lat", "dest_lng");

-- CreateIndex
CREATE INDEX "rides_creator_id_idx" ON "rides"("creator_id");

-- CreateIndex
CREATE INDEX "ride_requests_user_id_status_idx" ON "ride_requests"("user_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ride_requests_ride_id_user_id_key" ON "ride_requests"("ride_id", "user_id");

-- CreateIndex
CREATE INDEX "ride_messages_ride_id_created_at_idx" ON "ride_messages"("ride_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "journeys_track_token_hash_key" ON "journeys"("track_token_hash");

-- CreateIndex
CREATE INDEX "journeys_status_expected_arrival_at_idx" ON "journeys"("status", "expected_arrival_at");

-- CreateIndex
CREATE INDEX "journeys_user_id_idx" ON "journeys"("user_id");

-- CreateIndex
CREATE INDEX "journey_events_journey_id_idx" ON "journey_events"("journey_id");

-- CreateIndex
CREATE INDEX "alerts_status_created_at_idx" ON "alerts"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "alerts_latitude_longitude_idx" ON "alerts"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "alerts_author_id_idx" ON "alerts"("author_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_read_at_created_at_idx" ON "notifications"("user_id", "read_at", "created_at" DESC);

-- CreateIndex
CREATE INDEX "flags_status_created_at_idx" ON "flags"("status", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "flags_reporter_id_target_type_target_id_key" ON "flags"("reporter_id", "target_type", "target_id");

-- CreateIndex
CREATE INDEX "moderation_actions_actor_id_idx" ON "moderation_actions"("actor_id");

-- CreateIndex
CREATE INDEX "moderation_actions_target_type_target_id_idx" ON "moderation_actions"("target_type", "target_id");

-- CreateIndex
CREATE INDEX "moderation_actions_created_at_idx" ON "moderation_actions"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_photos" ADD CONSTRAINT "report_photos_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_confirmations" ADD CONSTRAINT "report_confirmations_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_confirmations" ADD CONSTRAINT "report_confirmations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_status_history" ADD CONSTRAINT "report_status_history_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_status_history" ADD CONSTRAINT "report_status_history_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ride_requests" ADD CONSTRAINT "ride_requests_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "rides"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ride_requests" ADD CONSTRAINT "ride_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ride_participants" ADD CONSTRAINT "ride_participants_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "rides"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ride_participants" ADD CONSTRAINT "ride_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ride_messages" ADD CONSTRAINT "ride_messages_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "rides"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ride_messages" ADD CONSTRAINT "ride_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journeys" ADD CONSTRAINT "journeys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journeys" ADD CONSTRAINT "journeys_emergency_contact_id_fkey" FOREIGN KEY ("emergency_contact_id") REFERENCES "emergency_contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journey_events" ADD CONSTRAINT "journey_events_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_votes" ADD CONSTRAINT "alert_votes_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "alerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_votes" ADD CONSTRAINT "alert_votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_subscriptions" ADD CONSTRAINT "alert_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flags" ADD CONSTRAINT "flags_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderation_actions" ADD CONSTRAINT "moderation_actions_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ─── Section 06 Custom Constraints & Partial Indexes ──────────────────────────

-- Partial UNIQUE index: one active/overdue journey per user
CREATE UNIQUE INDEX "one_active_journey_per_user" ON "journeys"("user_id") WHERE "status" IN ('ACTIVE', 'OVERDUE');

-- Users CHECK constraints
ALTER TABLE "users" ADD CONSTRAINT "check_users_strike_count" CHECK ("strike_count" >= 0);

-- Reports CHECK constraints
ALTER TABLE "reports" ADD CONSTRAINT "check_reports_latitude" CHECK ("latitude" BETWEEN -90 AND 90);
ALTER TABLE "reports" ADD CONSTRAINT "check_reports_longitude" CHECK ("longitude" BETWEEN -180 AND 180);

-- Rides CHECK constraints
ALTER TABLE "rides" ADD CONSTRAINT "check_rides_seats_total" CHECK ("seats_total" BETWEEN 1 AND 3);
ALTER TABLE "rides" ADD CONSTRAINT "check_rides_seats_taken" CHECK ("seats_taken" >= 0 AND "seats_taken" <= "seats_total");
ALTER TABLE "rides" ADD CONSTRAINT "check_rides_estimated_total_fare" CHECK ("estimated_total_fare" BETWEEN 10 AND 5000);

-- Alerts CHECK constraints
ALTER TABLE "alerts" ADD CONSTRAINT "check_alerts_latitude" CHECK ("latitude" BETWEEN -90 AND 90);
ALTER TABLE "alerts" ADD CONSTRAINT "check_alerts_longitude" CHECK ("longitude" BETWEEN -180 AND 180);

-- Alert subscriptions CHECK constraints
ALTER TABLE "alert_subscriptions" ADD CONSTRAINT "check_alert_subscriptions_radius_km" CHECK ("radius_km" BETWEEN 1 AND 10);
