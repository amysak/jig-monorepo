import type { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1673609140658 implements MigrationInterface {
  name = "Initial1673609140658";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "type" text NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aba82a752f863383b6283170cc" ON "profile" ("type") `
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "type" text NOT NULL, "phone_numbers" text NOT NULL, "account_id" integer, "name_salutation" text, "name_first" text, "name_last" text, "name_title" text, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cabinet_specifications" ("id" SERIAL NOT NULL, "is_interior_finished" boolean NOT NULL, "height" real NOT NULL, "elevation" real NOT NULL DEFAULT '0', "depth" real NOT NULL, "drawer_count" integer NOT NULL, "tray_count" integer NOT NULL, "door_count" integer NOT NULL, "toe_kick_height" real NOT NULL DEFAULT '4.25', "top_included" boolean NOT NULL DEFAULT true, "top_finished_sides_count" integer NOT NULL DEFAULT '2', "top_depth_difference" real NOT NULL DEFAULT '0', "back_included" boolean NOT NULL DEFAULT true, "back_finished_sides_count" integer NOT NULL DEFAULT '2', "deck_included" boolean NOT NULL DEFAULT true, "deck_finished_sides_count" integer NOT NULL DEFAULT '2', "deck_depth_difference" real NOT NULL DEFAULT '0', "adjustable_shelves_quantity" integer NOT NULL DEFAULT '0', "adjustable_shelves_finished_sides_count" integer NOT NULL DEFAULT '2', "adjustable_shelves_depth_difference" real NOT NULL DEFAULT '0', "fixed_shelves_quantity" integer NOT NULL DEFAULT '0', "fixed_shelves_finished_sides_count" integer NOT NULL DEFAULT '2', "fixed_shelves_depth_difference" real NOT NULL DEFAULT '0', "nailer_height" real NOT NULL DEFAULT '0', "nailer_quantity" integer NOT NULL DEFAULT '1', "nailer_finished_sides_count" integer NOT NULL DEFAULT '2', "nailer_subtract_nailer_from_back" boolean NOT NULL DEFAULT false, "sides_quantity" integer NOT NULL DEFAULT '2', "sides_finished_sides_count" integer NOT NULL DEFAULT '2', "sides_depth_difference" real NOT NULL DEFAULT '0', "stretcher_below_drawer_depth" real NOT NULL DEFAULT '0', "stretcher_below_drawer_finished_sides_count" integer NOT NULL DEFAULT '2', "top_back_stretcher_depth" real NOT NULL DEFAULT '0', "top_back_stretcher_finished_sides_count" integer NOT NULL DEFAULT '2', "top_front_stretcher_depth" real NOT NULL DEFAULT '0', "top_front_stretcher_finished_sides_count" integer NOT NULL DEFAULT '0', "face_frame_included" boolean NOT NULL DEFAULT false, "face_frame_rail_height" real NOT NULL DEFAULT '3', "face_frame_rail_finished_sides" integer NOT NULL DEFAULT '2', "face_frame_stile_width" real NOT NULL DEFAULT '1.5', "face_frame_stile_finished_sides" integer NOT NULL DEFAULT '2', "filler_width" real NOT NULL DEFAULT '0', "drawers_allowance" real NOT NULL DEFAULT '0', "drawers_depth_difference" real NOT NULL DEFAULT '0', CONSTRAINT "PK_a23f521046585b5ee033fb4f5c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "hardware_set" ("id" SERIAL NOT NULL, CONSTRAINT "PK_bfea111079ef7a62458af4aa21f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "markup" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "status" text NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "account_id" integer, "fees_design" real NOT NULL, "fees_show_design_on_estimate" boolean NOT NULL DEFAULT false, "fees_sales_commission" real NOT NULL, "fees_profit" real NOT NULL, "fees_overhead" real NOT NULL, "fees_additional" real NOT NULL DEFAULT '0', "fees_fixed" real NOT NULL DEFAULT '0', "taxes_sales_tax" real NOT NULL, "taxes_show_on_reports" boolean NOT NULL DEFAULT false, "taxes_applied_to_materials" boolean NOT NULL DEFAULT true, "taxes_applied_to_shop_labor" boolean NOT NULL DEFAULT false, "taxes_applied_to_installation" boolean NOT NULL DEFAULT false, "taxes_applied_to_delivery" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_538ba7ba13a4674c798e546b9a4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "material_set" ("id" SERIAL NOT NULL, "name" text NOT NULL, "door_profile_set_edge_id" integer, "door_profile_set_frame_id" integer, "door_profile_set_panel_id" integer, "door_model" text NOT NULL, CONSTRAINT "PK_bf795de17b459a2cc96e527e1f8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."terms_type_enum" AS ENUM('net', 'multi')`
    );
    await queryRunner.query(
      `CREATE TABLE "terms" ("id" SERIAL NOT NULL, "type" "public"."terms_type_enum" NOT NULL, "name" text NOT NULL, "description" text, "delivered" boolean NOT NULL DEFAULT true, "installed" boolean NOT NULL DEFAULT true, "status" text NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "payments" jsonb, "payment_due" integer, "discount_due" integer, "discount_percent" integer, "adjust_total" boolean, "account_id" integer, "conditions_proposal" text, "conditions_estimate" text, CONSTRAINT "PK_33b6fe77d6ace7ff43cc8a65958" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "account_preferences" ("id" SERIAL NOT NULL, "report_text" character varying, "suspend" boolean NOT NULL DEFAULT false, "terms_id" integer, "markup_id" integer, "material_set_id" integer, "hardware_set_id" integer, "cabinet_specifications_id" integer, CONSTRAINT "PK_35f5ce85c1ef8f032df1311b452" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "client_preferences" ("id" SERIAL NOT NULL, "report_text" character varying, "suspend" boolean NOT NULL DEFAULT false, "terms_id" integer, "markup_id" integer, "material_set_id" integer, "hardware_set_id" integer, "cabinet_specifications_id" integer, CONSTRAINT "PK_0d06e691326d586481f28447cfb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job_preferences" ("id" SERIAL NOT NULL, "report_text" character varying, "suspend" boolean NOT NULL DEFAULT false, "terms_id" integer, "markup_id" integer, "material_set_id" integer, "hardware_set_id" integer, "cabinet_specifications_id" integer, "delivery_text" text, "delivery_trip_quantity" integer, "delivery_miles_to_job_site" integer, "delivery_per_trip" real, "delivery_per_mile" real, "delivery_per_box" real, CONSTRAINT "PK_0fec48157a95b4d070dd1527244" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "name" text NOT NULL, "estimate_date" TIMESTAMP NOT NULL DEFAULT now(), "proposal_date" TIMESTAMP NOT NULL DEFAULT now(), "description" text, "subdivision" text, "lot_number" integer, "client_id" integer NOT NULL, "account_id" integer NOT NULL, "status" text NOT NULL DEFAULT 'estimate', "preferences_id" integer, "notes_internal" text, "notes_external" text, CONSTRAINT "REL_0fec48157a95b4d070dd152724" UNIQUE ("preferences_id"), CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text, "status" text NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "account_id" integer, "preferences_id" integer, "addresses_mailing_id" integer, "addresses_physical_id" integer, CONSTRAINT "REL_0d06e691326d586481f28447cf" UNIQUE ("preferences_id"), CONSTRAINT "REL_0b35eeade60c594a9b0b2a61b7" UNIQUE ("addresses_mailing_id"), CONSTRAINT "REL_487d70af2ae8a1d665b3c16c1b" UNIQUE ("addresses_physical_id"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text, "salt" text, "role" text NOT NULL DEFAULT 'sales', "status" text NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "preferences_id" integer, "stripe_key" character varying, "company_name" character varying NOT NULL, "company_contact_name" character varying, "company_logo" character varying, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "REL_35f5ce85c1ef8f032df1311b45" UNIQUE ("preferences_id"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "filler" ("id" SERIAL NOT NULL, "depth" real NOT NULL, "cabinet_id" integer, "room_id" integer, CONSTRAINT "PK_9853d92975791b2161c09774a72" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "finish" ("id" SERIAL NOT NULL, "category" text NOT NULL, "description" text NOT NULL, "discount" real, "price_per_part" text, "price_per_square_feet" text, CONSTRAINT "PK_6236f6fb29d64c850790581fe61" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "labor_rate" ("id" SERIAL NOT NULL, "category" text NOT NULL, "type" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "unit_of_measurement" text NOT NULL, "amount" real NOT NULL, "account_id" integer, CONSTRAINT "PK_476421ea94c45eb7e2f3642bdaf" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "letter" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "body" text NOT NULL, "status" text NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "account_id" integer, CONSTRAINT "PK_7a85cf0e444dff7c656a31b32bf" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "material" ("id" SERIAL NOT NULL, "purpose" text NOT NULL, "source" text NOT NULL, "name" text NOT NULL, "type" text NOT NULL, "description" text NOT NULL, "price" real NOT NULL, "discount" real NOT NULL, "waste_factor" real NOT NULL, "labor_cost" real NOT NULL, "is_finished" boolean NOT NULL, "length_of_roll" integer, "vendor_id" uuid, CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_75fa86245e05268a3abfe93bd4" ON "material" ("purpose") `
    );
    await queryRunner.query(
      `CREATE TABLE "panel" ("id" SERIAL NOT NULL, "type" text NOT NULL, "height" real NOT NULL, "panels_count" integer, "width" real, "cabinet_type" text, "depth" real, "account_id" integer, "room_id" integer, "cabinet_id" integer, CONSTRAINT "PK_bbd5674b69f7448974aa41ab347" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ba0e4441c5d59fde41e57775e0" ON "panel" ("type") `
    );
    await queryRunner.query(
      `CREATE TABLE "toe" ("id" SERIAL NOT NULL, "type" text NOT NULL, "height" real NOT NULL, "length" real NOT NULL, "thickness" real, "sleepers_count" integer, "depth" real, "room_id" integer, "cabinet_id" integer, CONSTRAINT "PK_cd4b30f86a68d19f51d61286e2b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_667e69ec3f59b728a4bc2b380d" ON "toe" ("type") `
    );
    await queryRunner.query(
      `CREATE TABLE "trim_molding" ("id" SERIAL NOT NULL, "description" text NOT NULL, "subclassification" text NOT NULL, "type" character varying NOT NULL, "room_id" integer, CONSTRAINT "PK_e09491b07709aa4cff5832bafa7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a2ca4ff39aecca9c436e81c313" ON "trim_molding" ("type") `
    );
    await queryRunner.query(
      `CREATE TABLE "vendor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "account_id" integer, CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cabinet_opening" ("id" SERIAL NOT NULL, "type" text NOT NULL, "model_name" text NOT NULL, "material_type" text NOT NULL, "price" real NOT NULL, "discount" real NOT NULL, "vendor_id" uuid, "default_profiles_edge_id" integer, "default_profiles_frame_id" integer, "default_profiles_panel_id" integer, CONSTRAINT "PK_da372022eb4321795c4bf624f8b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cabinet" ("id" SERIAL NOT NULL, "type" text NOT NULL DEFAULT 'base', "placement" text NOT NULL DEFAULT 'default', "base_type" text NOT NULL DEFAULT 'standard', "specifications_id" integer NOT NULL, "account_id" integer NOT NULL, "room_id" integer, CONSTRAINT "REL_a23f521046585b5ee033fb4f5c" UNIQUE ("specifications_id"), CONSTRAINT "PK_6e1aaa59022d432d8cf3df7ef46" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2f5da8ec9ebfd8af48fb316e6f" ON "cabinet" ("type") `
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" SERIAL NOT NULL, "total_price" real NOT NULL DEFAULT '0', "name" text NOT NULL, "elevation" text, "status" text NOT NULL DEFAULT 'estimate', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "material_set_id" integer, "hardware_set_id" integer, "job_id" integer, "account_id" integer, CONSTRAINT "REL_12dd210e46c2e7082542370659" UNIQUE ("material_set_id"), CONSTRAINT "REL_5413f589e26d684ee473be324b" UNIQUE ("hardware_set_id"), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "accessory" ("id" SERIAL NOT NULL, "type" text NOT NULL, "classification" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "material_cost" real NOT NULL, "discount" real, "shop_labor_cost" real NOT NULL, "installation_labor_cost" real NOT NULL, "unit_of_measurement" text NOT NULL DEFAULT 'each', "report" boolean NOT NULL DEFAULT true, "status" text NOT NULL DEFAULT 'active', "category" text NOT NULL, "room_id" integer, CONSTRAINT "PK_e1ead99f958789eeebd86246d74" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "hardware" ("id" SERIAL NOT NULL, "type" text NOT NULL, "classification" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "material_cost" real NOT NULL, "discount" real, "shop_labor_cost" real NOT NULL, "installation_labor_cost" real NOT NULL, "unit_of_measurement" text NOT NULL DEFAULT 'each', "report" boolean NOT NULL DEFAULT true, "status" text NOT NULL DEFAULT 'active', "category" text NOT NULL, "room_id" integer, CONSTRAINT "PK_3334ecf6c630e1fb3442e88a31e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_59e520beb3bb0606a3a0c2dc797" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "markup" ADD CONSTRAINT "FK_1a272d4555dbc776202913fd828" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_198754697b1dfcaff4515cc719b" FOREIGN KEY ("door_profile_set_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_16164cdf492ae2396a8aad0c042" FOREIGN KEY ("door_profile_set_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_2e14be031ad55984964a181f719" FOREIGN KEY ("door_profile_set_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "terms" ADD CONSTRAINT "FK_3e189248a5fe0d58c0bc986e2bd" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" ADD CONSTRAINT "FK_0ed0f9ad32368f747dc165fd6e5" FOREIGN KEY ("terms_id") REFERENCES "terms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" ADD CONSTRAINT "FK_9e5fadacba01d94d5d70bdbff58" FOREIGN KEY ("markup_id") REFERENCES "markup"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" ADD CONSTRAINT "FK_918dbdb11d27818f94fa949904b" FOREIGN KEY ("material_set_id") REFERENCES "material_set"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" ADD CONSTRAINT "FK_feca787023742c1c904fd7e09ab" FOREIGN KEY ("hardware_set_id") REFERENCES "hardware_set"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" ADD CONSTRAINT "FK_59349957f79fceda67b164f314e" FOREIGN KEY ("cabinet_specifications_id") REFERENCES "cabinet_specifications"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" ADD CONSTRAINT "FK_f889da5b713c033b5c89bf4ae81" FOREIGN KEY ("terms_id") REFERENCES "terms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" ADD CONSTRAINT "FK_35c1ef0b7eb43c32e41692330b0" FOREIGN KEY ("markup_id") REFERENCES "markup"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" ADD CONSTRAINT "FK_395a0e49c3273705a372e932e3f" FOREIGN KEY ("material_set_id") REFERENCES "material_set"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" ADD CONSTRAINT "FK_23fe4cdae841ca95b9f93c06249" FOREIGN KEY ("hardware_set_id") REFERENCES "hardware_set"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" ADD CONSTRAINT "FK_31ce49ae9dc0df14c7e8ec4233a" FOREIGN KEY ("cabinet_specifications_id") REFERENCES "cabinet_specifications"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" ADD CONSTRAINT "FK_5fe82dbb55cea8662c6b407dee6" FOREIGN KEY ("terms_id") REFERENCES "terms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" ADD CONSTRAINT "FK_2f44627ccda5bbc9eb480e5d01c" FOREIGN KEY ("markup_id") REFERENCES "markup"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" ADD CONSTRAINT "FK_7ffda0fd32d01179a3a88d1b26b" FOREIGN KEY ("material_set_id") REFERENCES "material_set"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" ADD CONSTRAINT "FK_533650eb0e2647f5e1a5dc34acb" FOREIGN KEY ("hardware_set_id") REFERENCES "hardware_set"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" ADD CONSTRAINT "FK_ac2afd4c17f457e16e8473aeec1" FOREIGN KEY ("cabinet_specifications_id") REFERENCES "cabinet_specifications"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_cc52bb1d22b93ebd7d86a88da4d" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_80174406bf48aa737052326682b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_0fec48157a95b4d070dd1527244" FOREIGN KEY ("preferences_id") REFERENCES "job_preferences"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_b3627c981b3d782cb5a2845e3d8" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_0d06e691326d586481f28447cfb" FOREIGN KEY ("preferences_id") REFERENCES "client_preferences"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_0b35eeade60c594a9b0b2a61b71" FOREIGN KEY ("addresses_mailing_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_487d70af2ae8a1d665b3c16c1ba" FOREIGN KEY ("addresses_physical_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_35f5ce85c1ef8f032df1311b452" FOREIGN KEY ("preferences_id") REFERENCES "account_preferences"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "filler" ADD CONSTRAINT "FK_9698cc77823c8676e6cdfbeef5d" FOREIGN KEY ("cabinet_id") REFERENCES "cabinet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "filler" ADD CONSTRAINT "FK_65be08a094dbdbe6f79b9745aa6" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "labor_rate" ADD CONSTRAINT "FK_a5f58b6f6794d8384bab18056a8" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "letter" ADD CONSTRAINT "FK_b5a278beb945f8dde037cbd2f24" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material" ADD CONSTRAINT "FK_35ac89da66b3cf49672570116cc" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" ADD CONSTRAINT "FK_8ffed47dfa18261c4d88e9fc429" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" ADD CONSTRAINT "FK_88097c43070cdbe7e3038631491" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" ADD CONSTRAINT "FK_ad19449095d9bf65be1a3254b6d" FOREIGN KEY ("cabinet_id") REFERENCES "cabinet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "toe" ADD CONSTRAINT "FK_90fb9639c38e73ed7c16079b2a1" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "toe" ADD CONSTRAINT "FK_6934cf58b05cb5793b364597f48" FOREIGN KEY ("cabinet_id") REFERENCES "cabinet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trim_molding" ADD CONSTRAINT "FK_d43f70a045956816085612cb87c" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "vendor" ADD CONSTRAINT "FK_08b4e8e5f359316005b0a97f3ee" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet_opening" ADD CONSTRAINT "FK_80aa15d511228523592f1057488" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet_opening" ADD CONSTRAINT "FK_cd34141c86bff85346e0f3ae496" FOREIGN KEY ("default_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet_opening" ADD CONSTRAINT "FK_bbe63670c88fe8b37bf4a144af0" FOREIGN KEY ("default_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet_opening" ADD CONSTRAINT "FK_f9d59fa848f4fe5ac8cb83ac417" FOREIGN KEY ("default_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_a23f521046585b5ee033fb4f5c9" FOREIGN KEY ("specifications_id") REFERENCES "cabinet_specifications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_2685c6bbfe87898c3e24f04f8c7" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_4be0b1d4d96f55d481939c200d7" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_12dd210e46c2e70825423706590" FOREIGN KEY ("material_set_id") REFERENCES "material_set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_5413f589e26d684ee473be324bc" FOREIGN KEY ("hardware_set_id") REFERENCES "hardware_set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_e9e53e5f10ed89175f977a72318" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_df465d35ac761ca1e7f79df1956" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "accessory" ADD CONSTRAINT "FK_741a19af92f07ea873bd73f4a66" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "hardware" ADD CONSTRAINT "FK_83203b57da1880ed90e7bd922ab" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hardware" DROP CONSTRAINT "FK_83203b57da1880ed90e7bd922ab"`
    );
    await queryRunner.query(
      `ALTER TABLE "accessory" DROP CONSTRAINT "FK_741a19af92f07ea873bd73f4a66"`
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_df465d35ac761ca1e7f79df1956"`
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_e9e53e5f10ed89175f977a72318"`
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_5413f589e26d684ee473be324bc"`
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_12dd210e46c2e70825423706590"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" DROP CONSTRAINT "FK_4be0b1d4d96f55d481939c200d7"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" DROP CONSTRAINT "FK_2685c6bbfe87898c3e24f04f8c7"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" DROP CONSTRAINT "FK_a23f521046585b5ee033fb4f5c9"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet_opening" DROP CONSTRAINT "FK_f9d59fa848f4fe5ac8cb83ac417"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet_opening" DROP CONSTRAINT "FK_bbe63670c88fe8b37bf4a144af0"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet_opening" DROP CONSTRAINT "FK_cd34141c86bff85346e0f3ae496"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet_opening" DROP CONSTRAINT "FK_80aa15d511228523592f1057488"`
    );
    await queryRunner.query(
      `ALTER TABLE "vendor" DROP CONSTRAINT "FK_08b4e8e5f359316005b0a97f3ee"`
    );
    await queryRunner.query(
      `ALTER TABLE "trim_molding" DROP CONSTRAINT "FK_d43f70a045956816085612cb87c"`
    );
    await queryRunner.query(
      `ALTER TABLE "toe" DROP CONSTRAINT "FK_6934cf58b05cb5793b364597f48"`
    );
    await queryRunner.query(
      `ALTER TABLE "toe" DROP CONSTRAINT "FK_90fb9639c38e73ed7c16079b2a1"`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" DROP CONSTRAINT "FK_ad19449095d9bf65be1a3254b6d"`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" DROP CONSTRAINT "FK_88097c43070cdbe7e3038631491"`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" DROP CONSTRAINT "FK_8ffed47dfa18261c4d88e9fc429"`
    );
    await queryRunner.query(
      `ALTER TABLE "material" DROP CONSTRAINT "FK_35ac89da66b3cf49672570116cc"`
    );
    await queryRunner.query(
      `ALTER TABLE "letter" DROP CONSTRAINT "FK_b5a278beb945f8dde037cbd2f24"`
    );
    await queryRunner.query(
      `ALTER TABLE "labor_rate" DROP CONSTRAINT "FK_a5f58b6f6794d8384bab18056a8"`
    );
    await queryRunner.query(
      `ALTER TABLE "filler" DROP CONSTRAINT "FK_65be08a094dbdbe6f79b9745aa6"`
    );
    await queryRunner.query(
      `ALTER TABLE "filler" DROP CONSTRAINT "FK_9698cc77823c8676e6cdfbeef5d"`
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_35f5ce85c1ef8f032df1311b452"`
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_487d70af2ae8a1d665b3c16c1ba"`
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_0b35eeade60c594a9b0b2a61b71"`
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_0d06e691326d586481f28447cfb"`
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_b3627c981b3d782cb5a2845e3d8"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_0fec48157a95b4d070dd1527244"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_80174406bf48aa737052326682b"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_cc52bb1d22b93ebd7d86a88da4d"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" DROP CONSTRAINT "FK_ac2afd4c17f457e16e8473aeec1"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" DROP CONSTRAINT "FK_533650eb0e2647f5e1a5dc34acb"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" DROP CONSTRAINT "FK_7ffda0fd32d01179a3a88d1b26b"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" DROP CONSTRAINT "FK_2f44627ccda5bbc9eb480e5d01c"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_preferences" DROP CONSTRAINT "FK_5fe82dbb55cea8662c6b407dee6"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" DROP CONSTRAINT "FK_31ce49ae9dc0df14c7e8ec4233a"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" DROP CONSTRAINT "FK_23fe4cdae841ca95b9f93c06249"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" DROP CONSTRAINT "FK_395a0e49c3273705a372e932e3f"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" DROP CONSTRAINT "FK_35c1ef0b7eb43c32e41692330b0"`
    );
    await queryRunner.query(
      `ALTER TABLE "client_preferences" DROP CONSTRAINT "FK_f889da5b713c033b5c89bf4ae81"`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" DROP CONSTRAINT "FK_59349957f79fceda67b164f314e"`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" DROP CONSTRAINT "FK_feca787023742c1c904fd7e09ab"`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" DROP CONSTRAINT "FK_918dbdb11d27818f94fa949904b"`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" DROP CONSTRAINT "FK_9e5fadacba01d94d5d70bdbff58"`
    );
    await queryRunner.query(
      `ALTER TABLE "account_preferences" DROP CONSTRAINT "FK_0ed0f9ad32368f747dc165fd6e5"`
    );
    await queryRunner.query(
      `ALTER TABLE "terms" DROP CONSTRAINT "FK_3e189248a5fe0d58c0bc986e2bd"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_2e14be031ad55984964a181f719"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_16164cdf492ae2396a8aad0c042"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_198754697b1dfcaff4515cc719b"`
    );
    await queryRunner.query(
      `ALTER TABLE "markup" DROP CONSTRAINT "FK_1a272d4555dbc776202913fd828"`
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_59e520beb3bb0606a3a0c2dc797"`
    );
    await queryRunner.query(`DROP TABLE "hardware"`);
    await queryRunner.query(`DROP TABLE "accessory"`);
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2f5da8ec9ebfd8af48fb316e6f"`
    );
    await queryRunner.query(`DROP TABLE "cabinet"`);
    await queryRunner.query(`DROP TABLE "cabinet_opening"`);
    await queryRunner.query(`DROP TABLE "vendor"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a2ca4ff39aecca9c436e81c313"`
    );
    await queryRunner.query(`DROP TABLE "trim_molding"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_667e69ec3f59b728a4bc2b380d"`
    );
    await queryRunner.query(`DROP TABLE "toe"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ba0e4441c5d59fde41e57775e0"`
    );
    await queryRunner.query(`DROP TABLE "panel"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_75fa86245e05268a3abfe93bd4"`
    );
    await queryRunner.query(`DROP TABLE "material"`);
    await queryRunner.query(`DROP TABLE "letter"`);
    await queryRunner.query(`DROP TABLE "labor_rate"`);
    await queryRunner.query(`DROP TABLE "finish"`);
    await queryRunner.query(`DROP TABLE "filler"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TABLE "job"`);
    await queryRunner.query(`DROP TABLE "job_preferences"`);
    await queryRunner.query(`DROP TABLE "client_preferences"`);
    await queryRunner.query(`DROP TABLE "account_preferences"`);
    await queryRunner.query(`DROP TABLE "terms"`);
    await queryRunner.query(`DROP TYPE "public"."terms_type_enum"`);
    await queryRunner.query(`DROP TABLE "material_set"`);
    await queryRunner.query(`DROP TABLE "markup"`);
    await queryRunner.query(`DROP TABLE "hardware_set"`);
    await queryRunner.query(`DROP TABLE "cabinet_specifications"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aba82a752f863383b6283170cc"`
    );
    await queryRunner.query(`DROP TABLE "profile"`);
  }
}
