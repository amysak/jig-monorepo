import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1676422744749 implements MigrationInterface {
  name = "Initial1676422744749";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hardware_set" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_bfea111079ef7a62458af4aa21f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "email" text, "user_id" integer NOT NULL, "addresses_mailing_id" integer, "addresses_physical_id" integer, CONSTRAINT "REL_0b35eeade60c594a9b0b2a61b7" UNIQUE ("addresses_mailing_id"), CONSTRAINT "REL_487d70af2ae8a1d665b3c16c1b" UNIQUE ("addresses_physical_id"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "markup" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text, "user_id" integer NOT NULL, "fees_design" real NOT NULL, "fees_show_design_on_estimate" boolean NOT NULL DEFAULT false, "fees_sales_commission" real NOT NULL, "fees_profit" real NOT NULL, "fees_overhead" real NOT NULL, "fees_additional" real NOT NULL DEFAULT '0', "fees_fixed" real NOT NULL DEFAULT '0', "taxes_sales_tax" real NOT NULL, "taxes_show_on_reports" boolean NOT NULL DEFAULT false, "taxes_applied_to_materials" boolean NOT NULL DEFAULT true, "taxes_applied_to_shop_labor" boolean NOT NULL DEFAULT false, "taxes_applied_to_installation" boolean NOT NULL DEFAULT false, "taxes_applied_to_delivery" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_538ba7ba13a4674c798e546b9a4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "terms" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" text NOT NULL, "name" text NOT NULL, "description" text, "delivered" boolean NOT NULL DEFAULT true, "installed" boolean NOT NULL DEFAULT true, "payments" jsonb, "payment_due" integer, "discount_due" integer, "discount_percent" integer, "adjust_total" boolean NOT NULL DEFAULT false, "text" text, "user_id" integer NOT NULL, "conditions_proposal" text, "conditions_estimate" text, CONSTRAINT "PK_33b6fe77d6ace7ff43cc8a65958" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "estimate_date" TIMESTAMP, "proposal_date" TIMESTAMP, "description" text, "subdivision" text, "lot_number" integer, "status" text NOT NULL DEFAULT 'estimate', "terms_id" integer, "markup_id" integer, "user_id" integer NOT NULL, "client_id" integer, "notes_internal" text, "notes_external" text, "delivery_text" text, "delivery_trip_quantity" integer NOT NULL DEFAULT '1', "delivery_miles" integer NOT NULL DEFAULT '0', CONSTRAINT "REL_250855e1cab1faf90d64bae183" UNIQUE ("terms_id"), CONSTRAINT "REL_f1ff740d66dc8a05e4af65f7e6" UNIQUE ("markup_id"), CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "paint" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "type" text NOT NULL, "description" text, "user_id" integer, CONSTRAINT "PK_5251080abab00b2859ac1dda79c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "finish_process" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text NOT NULL, "user_id" integer, "price_per_part_two_sides_cost" real, "price_per_part_discount" integer, "price_per_part_simple_percent" integer NOT NULL DEFAULT '67', "price_per_square_feet_two_sides_cost" real, "price_per_square_feet_discount" integer, CONSTRAINT "PK_73e5df1aa5a147ca43628e2f01d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "upcharge" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text, "time" integer, "amount" real NOT NULL, "report" boolean NOT NULL DEFAULT true, "cabinet_id" integer, "room_id" integer, "user_id" integer NOT NULL, "profile_id" integer, CONSTRAINT "PK_aafc28551da1156a8575ac79e22" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "type" text NOT NULL, "image" text, "vendor_id" integer, "user_id" integer NOT NULL, "room_id" integer, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "model" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "material_type" text NOT NULL, "description" text, "image" text, "vendor_id" integer NOT NULL, "base_door_profiles_edge_id" integer, "base_door_profiles_frame_id" integer, "base_door_profiles_panel_id" integer, "upper_door_profiles_edge_id" integer, "upper_door_profiles_frame_id" integer, "upper_door_profiles_panel_id" integer, "drawer_front_profiles_edge_id" integer, "drawer_front_profiles_frame_id" integer, "drawer_front_profiles_panel_id" integer, "appliance_panel_profiles_edge_id" integer, "appliance_panel_profiles_frame_id" integer, "appliance_panel_profiles_panel_id" integer, "wainscot_panel_profiles_edge_id" integer, "wainscot_panel_profiles_frame_id" integer, "wainscot_panel_profiles_panel_id" integer, "end_panel_profiles_edge_id" integer, "end_panel_profiles_frame_id" integer, "end_panel_profiles_panel_id" integer, "slab_end_profiles_edge_id" integer, "slab_end_profiles_frame_id" integer, "slab_end_profiles_panel_id" integer, "base_door_description" text, "upper_door_description" text, "drawer_front_description" text, "appliance_panel_description" text, "wainscot_panel_description" text, "end_panel_description" text, "slab_end_description" text, CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "vendor" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "material" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "purpose" text NOT NULL, "source" text NOT NULL, "name" text NOT NULL, "type" text NOT NULL, "description" text NOT NULL, "price" real NOT NULL, "discount" real NOT NULL DEFAULT '0', "waste_factor" real NOT NULL DEFAULT '0', "vendor_id" integer, "user_id" integer, CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "material_set" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "user_id" integer NOT NULL, "exterior_edgebanding_id" integer, "exterior_base_door_model_id" integer, "exterior_base_door_material_id" integer, "exterior_base_door_finishes_process_id" integer, "exterior_base_door_finishes_glaze_id" integer, "exterior_base_door_finishes_paint_id" integer, "exterior_base_door_profiles_edge_id" integer, "exterior_base_door_profiles_frame_id" integer, "exterior_base_door_profiles_panel_id" integer, "exterior_upper_door_model_id" integer, "exterior_upper_door_material_id" integer, "exterior_upper_door_finishes_process_id" integer, "exterior_upper_door_finishes_glaze_id" integer, "exterior_upper_door_finishes_paint_id" integer, "exterior_upper_door_profiles_edge_id" integer, "exterior_upper_door_profiles_frame_id" integer, "exterior_upper_door_profiles_panel_id" integer, "exterior_drawer_front_model_id" integer, "exterior_drawer_front_material_id" integer, "exterior_drawer_front_finishes_process_id" integer, "exterior_drawer_front_finishes_glaze_id" integer, "exterior_drawer_front_finishes_paint_id" integer, "exterior_drawer_front_profiles_edge_id" integer, "exterior_drawer_front_profiles_frame_id" integer, "exterior_drawer_front_profiles_panel_id" integer, "exterior_appliance_panel_model_id" integer, "exterior_appliance_panel_material_id" integer, "exterior_appliance_panel_finishes_process_id" integer, "exterior_appliance_panel_finishes_glaze_id" integer, "exterior_appliance_panel_finishes_paint_id" integer, "exterior_appliance_panel_profiles_edge_id" integer, "exterior_appliance_panel_profiles_frame_id" integer, "exterior_appliance_panel_profiles_panel_id" integer, "exterior_wainscot_panel_model_id" integer, "exterior_wainscot_panel_material_id" integer, "exterior_wainscot_panel_finishes_process_id" integer, "exterior_wainscot_panel_finishes_glaze_id" integer, "exterior_wainscot_panel_finishes_paint_id" integer, "exterior_wainscot_panel_profiles_edge_id" integer, "exterior_wainscot_panel_profiles_frame_id" integer, "exterior_wainscot_panel_profiles_panel_id" integer, "exterior_end_panel_model_id" integer, "exterior_end_panel_material_id" integer, "exterior_end_panel_finishes_process_id" integer, "exterior_end_panel_finishes_glaze_id" integer, "exterior_end_panel_finishes_paint_id" integer, "exterior_end_panel_profiles_edge_id" integer, "exterior_end_panel_profiles_frame_id" integer, "exterior_end_panel_profiles_panel_id" integer, "exterior_slab_end_model_id" integer, "exterior_slab_end_material_id" integer, "exterior_slab_end_finishes_process_id" integer, "exterior_slab_end_finishes_glaze_id" integer, "exterior_slab_end_finishes_paint_id" integer, "exterior_slab_end_profiles_edge_id" integer, "exterior_slab_end_profiles_frame_id" integer, "exterior_slab_end_profiles_panel_id" integer, "exterior_fillers_model_id" integer, "exterior_fillers_material_id" integer, "exterior_fillers_finishes_process_id" integer, "exterior_fillers_finishes_glaze_id" integer, "exterior_fillers_finishes_paint_id" integer, "exterior_fillers_profiles_edge_id" integer, "exterior_fillers_profiles_frame_id" integer, "exterior_fillers_profiles_panel_id" integer, "exterior_face_frame_model_id" integer, "exterior_face_frame_material_id" integer, "exterior_face_frame_finishes_process_id" integer, "exterior_face_frame_finishes_glaze_id" integer, "exterior_face_frame_finishes_paint_id" integer, "exterior_face_frame_profiles_edge_id" integer, "exterior_face_frame_profiles_frame_id" integer, "exterior_face_frame_profiles_panel_id" integer, "exterior_molding_crown_model_id" integer, "exterior_molding_crown_material_id" integer, "exterior_molding_crown_finishes_process_id" integer, "exterior_molding_crown_finishes_glaze_id" integer, "exterior_molding_crown_finishes_paint_id" integer, "exterior_molding_light_rail_model_id" integer, "exterior_molding_light_rail_material_id" integer, "exterior_molding_light_rail_finishes_process_id" integer, "exterior_molding_light_rail_finishes_glaze_id" integer, "exterior_molding_light_rail_finishes_paint_id" integer, "interior_platform_id" integer, "interior_finished_interior_id" integer, "interior_finished_back_id" integer, "interior_finished_shelves_id" integer, "interior_finished_finishes_process_id" integer, "interior_finished_finishes_glaze_id" integer, "interior_finished_finishes_paint_id" integer, "interior_unfinished_interior_id" integer, "interior_unfinished_back_id" integer, "interior_unfinished_shelves_id" integer, "interior_unfinished_finishes_process_id" integer, "interior_unfinished_finishes_glaze_id" integer, "interior_unfinished_finishes_paint_id" integer, "interior_drawer_box_model_id" integer, "interior_drawer_box_material_id" integer, "interior_drawer_box_finishes_process_id" integer, "interior_drawer_box_finishes_glaze_id" integer, "interior_drawer_box_finishes_paint_id" integer, "interior_tray_model_id" integer, "interior_tray_material_id" integer, "interior_tray_finishes_process_id" integer, "interior_tray_finishes_glaze_id" integer, "interior_tray_finishes_paint_id" integer, CONSTRAINT "PK_bf795de17b459a2cc96e527e1f8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "toe_platform" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "width" real NOT NULL, "height" real NOT NULL, "depth" real NOT NULL, "ends_count" integer NOT NULL DEFAULT '2', "sleepers_count" integer, "cabinet_id" integer, "user_id" integer NOT NULL, "room_id" integer, CONSTRAINT "PK_bf8f154f63ebaa09eea5ebe29a9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "panel" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "width" real NOT NULL, "height" real NOT NULL, "type" text NOT NULL, "panels_count" integer, "cabinet_id" integer, "user_id" integer NOT NULL, "room_id" integer, CONSTRAINT "PK_bbd5674b69f7448974aa41ab347" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "status" text NOT NULL DEFAULT 'estimate', "additional_fillers" text NOT NULL, "material_set_id" integer, "hardware_set_id" integer, "job_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_12dd210e46c2e7082542370659" UNIQUE ("material_set_id"), CONSTRAINT "REL_5413f589e26d684ee473be324b" UNIQUE ("hardware_set_id"), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "equipment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category" text NOT NULL, "classification" text NOT NULL, "name" text NOT NULL, "description" text, "discount" real, "price" real NOT NULL DEFAULT '0', "measurement" text NOT NULL DEFAULT 'unit', "report" boolean NOT NULL DEFAULT true, "waste_factor" real NOT NULL DEFAULT '0', "finish_complexity" text NOT NULL DEFAULT 'none', "cabinet_id" integer, "room_id" integer, "user_id" integer NOT NULL, CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cabinet" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "is_favourite" boolean NOT NULL DEFAULT false, "type" text NOT NULL, "corner" boolean NOT NULL DEFAULT false, "overriden_material_set_id" integer, "room_id" integer, "user_id" integer NOT NULL, "default_for_user_id" integer, "exterior_toe_platform_id" integer, "part_counts_sides" integer NOT NULL, "part_counts_trays" integer NOT NULL, "part_counts_doors" integer NOT NULL, "part_counts_drawers" integer NOT NULL, "part_counts_drawer_fronts" integer NOT NULL, "dimensions_floor_to_top" real NOT NULL DEFAULT '0', "dimensions_floor_to_bottom" real NOT NULL DEFAULT '0', "dimensions_width" real NOT NULL DEFAULT '0', "dimensions_depth" real NOT NULL DEFAULT '0', "exterior_applied_ends" jsonb NOT NULL, "exterior_filler" jsonb NOT NULL, "exterior_base_type" text NOT NULL DEFAULT 'standard', "exterior_face_frame_stiles" jsonb NOT NULL, "exterior_face_frame_rails" jsonb NOT NULL, "exterior_face_frame_rail_finished_sides" integer NOT NULL, "exterior_face_frame_stile_finished_sides" integer NOT NULL, "exterior_drawers_depth_difference" real NOT NULL DEFAULT '0', "interior_openings_reveal" real(3) NOT NULL, "interior_stretchers" jsonb NOT NULL, "interior_top_included" boolean NOT NULL DEFAULT true, "interior_top_finished_sides_count" integer NOT NULL DEFAULT '2', "interior_top_depth_difference" real NOT NULL DEFAULT '0', "interior_back_included" boolean NOT NULL DEFAULT true, "interior_back_finished_sides_count" integer NOT NULL DEFAULT '2', "interior_deck_included" boolean NOT NULL DEFAULT true, "interior_deck_finished_sides_count" integer NOT NULL DEFAULT '2', "interior_deck_depth_difference" real NOT NULL DEFAULT '0', "interior_shelves_adjustable_quantity" integer NOT NULL, "interior_shelves_adjustable_finished_sides_count" integer NOT NULL, "interior_shelves_adjustable_depth_difference" real NOT NULL, "interior_shelves_fixed_quantity" integer NOT NULL, "interior_shelves_fixed_finished_sides_count" integer NOT NULL, "interior_shelves_fixed_depth_difference" real NOT NULL, "interior_sides_quantity" integer NOT NULL, "interior_sides_finished_sides_count" integer NOT NULL, "interior_sides_additional_sides" jsonb NOT NULL, "interior_nailers_quantity" integer NOT NULL, "interior_nailers_height" real NOT NULL, "interior_nailers_finished_sides_count" integer NOT NULL, "interior_nailers_subtract" boolean NOT NULL DEFAULT true, CONSTRAINT "REL_c2ccabac9968389a75bef8510a" UNIQUE ("overriden_material_set_id"), CONSTRAINT "PK_6e1aaa59022d432d8cf3df7ef46" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "email" text NOT NULL, "password" text, "salt" text, "role" text NOT NULL DEFAULT 'sales', "stripe_key" text, "contact_name" text, "image" text, "preferences_terms_id" integer, "preferences_markup_id" integer, "preferences_material_set_id" integer, "preferences_hardware_set_id" integer, "preferences_report_text" text, "preferences_rate_per_minute" real NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_a5b5d67fe9ef0ec888b07c6f88" UNIQUE ("preferences_terms_id"), CONSTRAINT "REL_7d6c4fa5e8544011380e8f9651" UNIQUE ("preferences_markup_id"), CONSTRAINT "REL_e3fdc568e4ee5dab85fcab0a6b" UNIQUE ("preferences_material_set_id"), CONSTRAINT "REL_eee5f1300a966d3da1a322cd75" UNIQUE ("preferences_hardware_set_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" text NOT NULL, "address_line" text, "phone_numbers" text NOT NULL, "user_id" integer, "name_salutation" text NOT NULL, "name_first" text NOT NULL, "name_last" text NOT NULL, "name_title" text, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "model_base_door_upcharges_upcharge" ("model_id" integer NOT NULL, "upcharge_id" integer NOT NULL, CONSTRAINT "PK_ae0842fca42e643ec06fabd1edb" PRIMARY KEY ("model_id", "upcharge_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_33e2f3d6fdc1451adf34f8de22" ON "model_base_door_upcharges_upcharge" ("model_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3c0232cccb8073f1d7f52d525f" ON "model_base_door_upcharges_upcharge" ("upcharge_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "model_upper_door_upcharges_upcharge" ("model_id" integer NOT NULL, "upcharge_id" integer NOT NULL, CONSTRAINT "PK_3e2acd5e8a818d650527498e596" PRIMARY KEY ("model_id", "upcharge_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e3e17e2e61a14a23c632a8609d" ON "model_upper_door_upcharges_upcharge" ("model_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7bb05e5d826ac0bc23e93e3f42" ON "model_upper_door_upcharges_upcharge" ("upcharge_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "model_drawer_front_upcharges_upcharge" ("model_id" integer NOT NULL, "upcharge_id" integer NOT NULL, CONSTRAINT "PK_21fa8c0249fb335fe34af5bd2b4" PRIMARY KEY ("model_id", "upcharge_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4b3c00b1021512b42b1fd3f61d" ON "model_drawer_front_upcharges_upcharge" ("model_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a715a85bb6c10926bb8ff5ef29" ON "model_drawer_front_upcharges_upcharge" ("upcharge_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "model_appliance_panel_upcharges_upcharge" ("model_id" integer NOT NULL, "upcharge_id" integer NOT NULL, CONSTRAINT "PK_ad2ac2307098e277822a7466842" PRIMARY KEY ("model_id", "upcharge_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bb2df0d68bf9ed8cb190e085bf" ON "model_appliance_panel_upcharges_upcharge" ("model_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1a2c2f7951f8e61cb1466ab3f1" ON "model_appliance_panel_upcharges_upcharge" ("upcharge_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "model_wainscot_panel_upcharges_upcharge" ("model_id" integer NOT NULL, "upcharge_id" integer NOT NULL, CONSTRAINT "PK_bae0fd7379221710240ded61a9e" PRIMARY KEY ("model_id", "upcharge_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c7a116f3d044373c02283bbd68" ON "model_wainscot_panel_upcharges_upcharge" ("model_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e689dfb9d52224c730ce4bc47c" ON "model_wainscot_panel_upcharges_upcharge" ("upcharge_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "model_end_panel_upcharges_upcharge" ("model_id" integer NOT NULL, "upcharge_id" integer NOT NULL, CONSTRAINT "PK_54dae8e1a17bab56c8082e790b7" PRIMARY KEY ("model_id", "upcharge_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bca76ba5c830bb61f515ad0399" ON "model_end_panel_upcharges_upcharge" ("model_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d1b3ff6303db9b08d48f612fec" ON "model_end_panel_upcharges_upcharge" ("upcharge_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "model_slab_end_upcharges_upcharge" ("model_id" integer NOT NULL, "upcharge_id" integer NOT NULL, CONSTRAINT "PK_477e48283c70d489bfc91b47538" PRIMARY KEY ("model_id", "upcharge_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9934d21d32c1dc5bc789124c93" ON "model_slab_end_upcharges_upcharge" ("model_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_17cdf5a165515cc0f5973e2678" ON "model_slab_end_upcharges_upcharge" ("upcharge_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "equipment_upcharges_upcharge" ("equipment_id" integer NOT NULL, "upcharge_id" integer NOT NULL, CONSTRAINT "PK_7aa252a58acfe0b57c5467bec81" PRIMARY KEY ("equipment_id", "upcharge_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6301083047f356b24452ccc11f" ON "equipment_upcharges_upcharge" ("equipment_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ebd59c7397fac2dcfc75b1b7a6" ON "equipment_upcharges_upcharge" ("upcharge_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "hardware_set" ADD CONSTRAINT "FK_983ed17172115c526002a54afff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_f18a6fabea7b2a90ab6bf10a650" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_0b35eeade60c594a9b0b2a61b71" FOREIGN KEY ("addresses_mailing_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_487d70af2ae8a1d665b3c16c1ba" FOREIGN KEY ("addresses_physical_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "markup" ADD CONSTRAINT "FK_3835def0b0bbdd4d2df9def4541" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "terms" ADD CONSTRAINT "FK_3eaadcfc34c7011a2e0ea567a84" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_250855e1cab1faf90d64bae1830" FOREIGN KEY ("terms_id") REFERENCES "terms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_f1ff740d66dc8a05e4af65f7e67" FOREIGN KEY ("markup_id") REFERENCES "markup"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_13dd4ad96c9a725eadf48db7558" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_cc52bb1d22b93ebd7d86a88da4d" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "paint" ADD CONSTRAINT "FK_fef7a6f06b0faffa29899e5a5de" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "finish_process" ADD CONSTRAINT "FK_d4380ab5c841952ac49a137a591" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "upcharge" ADD CONSTRAINT "FK_1f0ba904611d948ab80cd25c542" FOREIGN KEY ("cabinet_id") REFERENCES "cabinet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "upcharge" ADD CONSTRAINT "FK_cb5a90b86bbdd89a67f3f4123d3" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "upcharge" ADD CONSTRAINT "FK_9f3fba39bcc108a3ddd2fb5f3fb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "upcharge" ADD CONSTRAINT "FK_0f8476354a13b64205337caef59" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_a1c3871b2b1cac747daf8425e57" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_ac89e7d1d10e398109385a3deb0" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_32aa2914362f4892081c441b70a" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_8ddbfd87c821f3b1f5c0ff8011e" FOREIGN KEY ("base_door_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_b1079dc4be787dc4d430620d055" FOREIGN KEY ("base_door_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_b20151dec550432d7a2001b31bf" FOREIGN KEY ("base_door_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_d2e0fcddd6360a95adc9a88e11e" FOREIGN KEY ("upper_door_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_a4360707bb3d8af75f1b4999e6e" FOREIGN KEY ("upper_door_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_ad64ed7f5b3f90c2062a9f07b38" FOREIGN KEY ("upper_door_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_47606a9f30fe87b007613ad49e2" FOREIGN KEY ("drawer_front_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_0d2c50898360da9b9897abc3640" FOREIGN KEY ("drawer_front_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_7a8ba0d1692d727839f15bbe6ac" FOREIGN KEY ("drawer_front_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_58c1a866cdf878654d4ef481489" FOREIGN KEY ("appliance_panel_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_c90fdd9599e3b80025f4dcb7953" FOREIGN KEY ("appliance_panel_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_23c0c1393f987f78acfabfbb98e" FOREIGN KEY ("appliance_panel_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_186ab759f1ee612003fd7cc66d9" FOREIGN KEY ("wainscot_panel_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_9fa72cf5ab379a5f3ffce1a1d61" FOREIGN KEY ("wainscot_panel_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_31a51e9c6ec0ebd475fcb51f246" FOREIGN KEY ("wainscot_panel_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_c07b82b17df9269de4842bb106b" FOREIGN KEY ("end_panel_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_cc436595a4ccee7547b8ff0e077" FOREIGN KEY ("end_panel_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_bf133e1d65980aef25bac8d1788" FOREIGN KEY ("end_panel_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_dee28060583f244fe5c92a0dcde" FOREIGN KEY ("slab_end_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_bd551bf4a45b25541c68174f3cc" FOREIGN KEY ("slab_end_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_cbce63a51bd55e471ad58a2dbda" FOREIGN KEY ("slab_end_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "vendor" ADD CONSTRAINT "FK_139dbded1008da1588c16f34a40" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material" ADD CONSTRAINT "FK_35ac89da66b3cf49672570116cc" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material" ADD CONSTRAINT "FK_e73cc1433934dc2278db9ad565b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_1dd17fdc4733917542bbd299b81" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_b5aaae001e74d1255c983363350" FOREIGN KEY ("exterior_edgebanding_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_3ba7104b6d1c7cbbcc7618f8035" FOREIGN KEY ("exterior_base_door_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_5da0ddfc2783b4b5a932a414ab2" FOREIGN KEY ("exterior_base_door_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_27030242ba76f52d74f0e08a32f" FOREIGN KEY ("exterior_base_door_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_f7c2c1f4a95ebddbeb01fb81585" FOREIGN KEY ("exterior_base_door_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_dfd15501aed8b807a9144576504" FOREIGN KEY ("exterior_base_door_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_e8da271f8994bab75de7a11a4f9" FOREIGN KEY ("exterior_base_door_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_07376358e039dbbd6eba54bd0a2" FOREIGN KEY ("exterior_base_door_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_ccfa8543166ad7d4bb39bfde9f9" FOREIGN KEY ("exterior_base_door_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_1d70ee482180116068d0d777dfb" FOREIGN KEY ("exterior_upper_door_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_2e28b6afe39a4cf3a0078cabc1c" FOREIGN KEY ("exterior_upper_door_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_11cb67d11cffe7e74028263093b" FOREIGN KEY ("exterior_upper_door_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_7ec935d62ea5bb2bc5ab146b0e2" FOREIGN KEY ("exterior_upper_door_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_6789a6f903932bf7945fa71f1f9" FOREIGN KEY ("exterior_upper_door_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_405da74b929f63d5ff7fd9c5063" FOREIGN KEY ("exterior_upper_door_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_9b60c452a3ef759405b5038cb4c" FOREIGN KEY ("exterior_upper_door_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_174107ff4374a983d2f90087ee5" FOREIGN KEY ("exterior_upper_door_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_a52462b5a1bcd290be91124b240" FOREIGN KEY ("exterior_drawer_front_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_26da84c77d0113b3704e97ef236" FOREIGN KEY ("exterior_drawer_front_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_3d00ac966f9c476be270f7d3d75" FOREIGN KEY ("exterior_drawer_front_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_08ed9eb06f348215f9a4201aa2f" FOREIGN KEY ("exterior_drawer_front_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_a392eb8f59b85fbe5246a57c204" FOREIGN KEY ("exterior_drawer_front_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_d6ec578cf8268edb486a21b82f9" FOREIGN KEY ("exterior_drawer_front_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_2f449614ea1f7fb14604be57d53" FOREIGN KEY ("exterior_drawer_front_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_2a3de3055da6422e0f153498f5b" FOREIGN KEY ("exterior_drawer_front_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_d1ca9feb449a8f07a697760efa3" FOREIGN KEY ("exterior_appliance_panel_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_803d991398fcecc8703229dc521" FOREIGN KEY ("exterior_appliance_panel_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_e930d1af1a35e084d9cbe5ede86" FOREIGN KEY ("exterior_appliance_panel_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_91374a1fe8a7c3482f850efd857" FOREIGN KEY ("exterior_appliance_panel_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_4588174ba3250538d9de986a660" FOREIGN KEY ("exterior_appliance_panel_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_05e8bf0c123e2709bfbfe24ee42" FOREIGN KEY ("exterior_appliance_panel_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_ff397f3ca19be85b00b25f99384" FOREIGN KEY ("exterior_appliance_panel_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_4d12b1e7213fe1bce00264b4929" FOREIGN KEY ("exterior_appliance_panel_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_e7d65cf2b396a7a0040907fa8db" FOREIGN KEY ("exterior_wainscot_panel_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_3716d094e3775f06e1bce81b3f8" FOREIGN KEY ("exterior_wainscot_panel_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_97ee065b5aa4606db688f8c17cb" FOREIGN KEY ("exterior_wainscot_panel_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_90e2c250b066a88ca0d7fb7ca9d" FOREIGN KEY ("exterior_wainscot_panel_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_0e233b6699e2aed345394f0e6f3" FOREIGN KEY ("exterior_wainscot_panel_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_294ff1c1bc1fda676f66395bc52" FOREIGN KEY ("exterior_wainscot_panel_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_684ec61c782de45bb54b07bd1b2" FOREIGN KEY ("exterior_wainscot_panel_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_31986d69264a9499b39cf3cc21c" FOREIGN KEY ("exterior_wainscot_panel_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_50de68d0ec8495d0516e7c02670" FOREIGN KEY ("exterior_end_panel_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_5a0c84b151d0a80d4cada8a3f9b" FOREIGN KEY ("exterior_end_panel_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_7f4c792d22eeb42fd60abab980f" FOREIGN KEY ("exterior_end_panel_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_537e0d7096fec29095b87610316" FOREIGN KEY ("exterior_end_panel_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_34e81bf1a4cf42da4f22605af3b" FOREIGN KEY ("exterior_end_panel_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_e840bf2bb2069b0f068c5b04aba" FOREIGN KEY ("exterior_end_panel_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_6810bbd46db723d2957160f2ca0" FOREIGN KEY ("exterior_end_panel_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_4be9fd4d687d8aed9f338eb23b9" FOREIGN KEY ("exterior_end_panel_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_cb1dd2e76a58fce7f2c25e434bb" FOREIGN KEY ("exterior_slab_end_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_86168563432c6f771aaa66ed999" FOREIGN KEY ("exterior_slab_end_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_85c7b64fe939c71a50a8649b024" FOREIGN KEY ("exterior_slab_end_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_6d371d82bb70925ca3c633d1a64" FOREIGN KEY ("exterior_slab_end_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_24200cdbb739c05bf04e9aac75d" FOREIGN KEY ("exterior_slab_end_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_5c2e753da0b96d6a6509d33f7c6" FOREIGN KEY ("exterior_slab_end_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_60822fc5bd6eae902498f20edf8" FOREIGN KEY ("exterior_slab_end_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_081e07941f2fb6391cc64e5a95c" FOREIGN KEY ("exterior_slab_end_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_057e0a34997080a6de4e76caa2a" FOREIGN KEY ("exterior_fillers_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_92f7e7da81fc8fdf585537f07ad" FOREIGN KEY ("exterior_fillers_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_557a62eb04b3172d5ac63ef6399" FOREIGN KEY ("exterior_fillers_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_87504f92112f32226a6bddf37c6" FOREIGN KEY ("exterior_fillers_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_418c57e6a2374d4011e3af5131d" FOREIGN KEY ("exterior_fillers_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_87fa7f0f5bf7567146dfdc22c5b" FOREIGN KEY ("exterior_fillers_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_ef2c1f1017e0edb47c5f8cc0a70" FOREIGN KEY ("exterior_fillers_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_b0d95d8b0b8d974569bbef878c1" FOREIGN KEY ("exterior_fillers_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_2624a7a03cb1153db3261776f65" FOREIGN KEY ("exterior_face_frame_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_69145c4e6f35f4157cb097e0e1c" FOREIGN KEY ("exterior_face_frame_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_559666d049f9d35fa37cb80bfbc" FOREIGN KEY ("exterior_face_frame_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_1226d5c5a199b5b3d56141f0b34" FOREIGN KEY ("exterior_face_frame_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_11d745c9b5c025f590040714f05" FOREIGN KEY ("exterior_face_frame_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_26986fd768f918a4adaf23984f3" FOREIGN KEY ("exterior_face_frame_profiles_edge_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_27e6f48d908191ffe6546a77aeb" FOREIGN KEY ("exterior_face_frame_profiles_frame_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_19e35fec818905bd16414209adb" FOREIGN KEY ("exterior_face_frame_profiles_panel_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_392ba5713e85cd021d12c3e7f99" FOREIGN KEY ("exterior_molding_crown_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_545417288957fdfe03bb8892a06" FOREIGN KEY ("exterior_molding_crown_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_bc91d7ae639dfcf8af4f9544524" FOREIGN KEY ("exterior_molding_crown_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_38569d0d543aeb61df7692db9ab" FOREIGN KEY ("exterior_molding_crown_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_09f46d677b43331124b4706f5f5" FOREIGN KEY ("exterior_molding_crown_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_c69e489766b2d7b9a6040134ca4" FOREIGN KEY ("exterior_molding_light_rail_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_e1967a8bd36b85783a5dffd9c7a" FOREIGN KEY ("exterior_molding_light_rail_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_81b4734158e2eb0da07540ff2f1" FOREIGN KEY ("exterior_molding_light_rail_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_af6320d523dbf2f724d5d87e9ad" FOREIGN KEY ("exterior_molding_light_rail_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_55b0c21cb84ea837d608aecf33b" FOREIGN KEY ("exterior_molding_light_rail_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_bb7eab91775cec38c77d9d162bc" FOREIGN KEY ("interior_platform_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_6cab12e7fb51afbdd0a5d843d7f" FOREIGN KEY ("interior_finished_interior_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_92f33cc6026ca42bdd16fda6544" FOREIGN KEY ("interior_finished_back_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_ea301ef446549ea0cd769dd92c5" FOREIGN KEY ("interior_finished_shelves_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_02aea25c556d2b94aca5cdeadde" FOREIGN KEY ("interior_finished_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_39da1e9485eecde1e5e5f756d84" FOREIGN KEY ("interior_finished_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_149106a08a60c14d7c0de9538dc" FOREIGN KEY ("interior_finished_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_ec54589e9ff068039a0e66bbdaa" FOREIGN KEY ("interior_unfinished_interior_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_fbfe321109774ba8af06a36562c" FOREIGN KEY ("interior_unfinished_back_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_b7287f0c456fb0b87f5d552456e" FOREIGN KEY ("interior_unfinished_shelves_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_cd515fce171feb1032a857bdbbd" FOREIGN KEY ("interior_unfinished_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_02ca55df3464f2abb1761e240f5" FOREIGN KEY ("interior_unfinished_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_da65620728ae2bbc7efa713bccd" FOREIGN KEY ("interior_unfinished_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_627e759201af8c99a28a1b1c890" FOREIGN KEY ("interior_drawer_box_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_e4edf91113338ef839692ae339e" FOREIGN KEY ("interior_drawer_box_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_e604467cb709c82305c9b8e494b" FOREIGN KEY ("interior_drawer_box_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_68fbfdf222f4f8bf92997d59a79" FOREIGN KEY ("interior_drawer_box_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_628eb25da0651afc00a6834dde8" FOREIGN KEY ("interior_drawer_box_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_37ce48d21319094955a199c400e" FOREIGN KEY ("interior_tray_model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_8e68f9dc94fea8e57b3495d197f" FOREIGN KEY ("interior_tray_material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_a68157a047d125519a20db90547" FOREIGN KEY ("interior_tray_finishes_process_id") REFERENCES "finish_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_91652ab6b75152809d660f0c223" FOREIGN KEY ("interior_tray_finishes_glaze_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" ADD CONSTRAINT "FK_51f6c2df38a70552c43cd21b7fd" FOREIGN KEY ("interior_tray_finishes_paint_id") REFERENCES "paint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "toe_platform" ADD CONSTRAINT "FK_6e7812e3700583caa59a708f909" FOREIGN KEY ("cabinet_id") REFERENCES "cabinet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "toe_platform" ADD CONSTRAINT "FK_2388a5ce227f3cac233966f84f2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "toe_platform" ADD CONSTRAINT "FK_afd5b98fe9128250e0f2e89451d" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" ADD CONSTRAINT "FK_ad19449095d9bf65be1a3254b6d" FOREIGN KEY ("cabinet_id") REFERENCES "cabinet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" ADD CONSTRAINT "FK_465f68e0f147699c9d436ccba63" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" ADD CONSTRAINT "FK_88097c43070cdbe7e3038631491" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
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
      `ALTER TABLE "room" ADD CONSTRAINT "FK_4bae79e46b7d9395a7ebdf86423" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD CONSTRAINT "FK_4b651329ee4b7309a607d14ac2d" FOREIGN KEY ("cabinet_id") REFERENCES "cabinet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD CONSTRAINT "FK_034fdb6d26b756bddee6191e40c" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD CONSTRAINT "FK_1d4f3c9f12d9f5cb2f02fd0dfbf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_c2ccabac9968389a75bef8510ab" FOREIGN KEY ("overriden_material_set_id") REFERENCES "material_set"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_4be0b1d4d96f55d481939c200d7" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_1f4bedea0d27ed8116ee820adf2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_e067da14d1437690059478f67f0" FOREIGN KEY ("default_for_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" ADD CONSTRAINT "FK_987696ebe83099636c7b818c215" FOREIGN KEY ("exterior_toe_platform_id") REFERENCES "toe_platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_a5b5d67fe9ef0ec888b07c6f884" FOREIGN KEY ("preferences_terms_id") REFERENCES "terms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_7d6c4fa5e8544011380e8f9651c" FOREIGN KEY ("preferences_markup_id") REFERENCES "markup"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e3fdc568e4ee5dab85fcab0a6bf" FOREIGN KEY ("preferences_material_set_id") REFERENCES "material_set"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_eee5f1300a966d3da1a322cd757" FOREIGN KEY ("preferences_hardware_set_id") REFERENCES "hardware_set"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "model_base_door_upcharges_upcharge" ADD CONSTRAINT "FK_33e2f3d6fdc1451adf34f8de229" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_base_door_upcharges_upcharge" ADD CONSTRAINT "FK_3c0232cccb8073f1d7f52d525f5" FOREIGN KEY ("upcharge_id") REFERENCES "upcharge"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_upper_door_upcharges_upcharge" ADD CONSTRAINT "FK_e3e17e2e61a14a23c632a8609d2" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_upper_door_upcharges_upcharge" ADD CONSTRAINT "FK_7bb05e5d826ac0bc23e93e3f426" FOREIGN KEY ("upcharge_id") REFERENCES "upcharge"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_drawer_front_upcharges_upcharge" ADD CONSTRAINT "FK_4b3c00b1021512b42b1fd3f61d8" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_drawer_front_upcharges_upcharge" ADD CONSTRAINT "FK_a715a85bb6c10926bb8ff5ef29b" FOREIGN KEY ("upcharge_id") REFERENCES "upcharge"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_appliance_panel_upcharges_upcharge" ADD CONSTRAINT "FK_bb2df0d68bf9ed8cb190e085bfe" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_appliance_panel_upcharges_upcharge" ADD CONSTRAINT "FK_1a2c2f7951f8e61cb1466ab3f17" FOREIGN KEY ("upcharge_id") REFERENCES "upcharge"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_wainscot_panel_upcharges_upcharge" ADD CONSTRAINT "FK_c7a116f3d044373c02283bbd684" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_wainscot_panel_upcharges_upcharge" ADD CONSTRAINT "FK_e689dfb9d52224c730ce4bc47c9" FOREIGN KEY ("upcharge_id") REFERENCES "upcharge"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_end_panel_upcharges_upcharge" ADD CONSTRAINT "FK_bca76ba5c830bb61f515ad03992" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_end_panel_upcharges_upcharge" ADD CONSTRAINT "FK_d1b3ff6303db9b08d48f612fec3" FOREIGN KEY ("upcharge_id") REFERENCES "upcharge"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_slab_end_upcharges_upcharge" ADD CONSTRAINT "FK_9934d21d32c1dc5bc789124c935" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "model_slab_end_upcharges_upcharge" ADD CONSTRAINT "FK_17cdf5a165515cc0f5973e2678a" FOREIGN KEY ("upcharge_id") REFERENCES "upcharge"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_upcharges_upcharge" ADD CONSTRAINT "FK_6301083047f356b24452ccc11f3" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_upcharges_upcharge" ADD CONSTRAINT "FK_ebd59c7397fac2dcfc75b1b7a66" FOREIGN KEY ("upcharge_id") REFERENCES "upcharge"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "equipment_upcharges_upcharge" DROP CONSTRAINT "FK_ebd59c7397fac2dcfc75b1b7a66"`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_upcharges_upcharge" DROP CONSTRAINT "FK_6301083047f356b24452ccc11f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_slab_end_upcharges_upcharge" DROP CONSTRAINT "FK_17cdf5a165515cc0f5973e2678a"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_slab_end_upcharges_upcharge" DROP CONSTRAINT "FK_9934d21d32c1dc5bc789124c935"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_end_panel_upcharges_upcharge" DROP CONSTRAINT "FK_d1b3ff6303db9b08d48f612fec3"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_end_panel_upcharges_upcharge" DROP CONSTRAINT "FK_bca76ba5c830bb61f515ad03992"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_wainscot_panel_upcharges_upcharge" DROP CONSTRAINT "FK_e689dfb9d52224c730ce4bc47c9"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_wainscot_panel_upcharges_upcharge" DROP CONSTRAINT "FK_c7a116f3d044373c02283bbd684"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_appliance_panel_upcharges_upcharge" DROP CONSTRAINT "FK_1a2c2f7951f8e61cb1466ab3f17"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_appliance_panel_upcharges_upcharge" DROP CONSTRAINT "FK_bb2df0d68bf9ed8cb190e085bfe"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_drawer_front_upcharges_upcharge" DROP CONSTRAINT "FK_a715a85bb6c10926bb8ff5ef29b"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_drawer_front_upcharges_upcharge" DROP CONSTRAINT "FK_4b3c00b1021512b42b1fd3f61d8"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_upper_door_upcharges_upcharge" DROP CONSTRAINT "FK_7bb05e5d826ac0bc23e93e3f426"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_upper_door_upcharges_upcharge" DROP CONSTRAINT "FK_e3e17e2e61a14a23c632a8609d2"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_base_door_upcharges_upcharge" DROP CONSTRAINT "FK_3c0232cccb8073f1d7f52d525f5"`
    );
    await queryRunner.query(
      `ALTER TABLE "model_base_door_upcharges_upcharge" DROP CONSTRAINT "FK_33e2f3d6fdc1451adf34f8de229"`
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_eee5f1300a966d3da1a322cd757"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e3fdc568e4ee5dab85fcab0a6bf"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_7d6c4fa5e8544011380e8f9651c"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_a5b5d67fe9ef0ec888b07c6f884"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" DROP CONSTRAINT "FK_987696ebe83099636c7b818c215"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" DROP CONSTRAINT "FK_e067da14d1437690059478f67f0"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" DROP CONSTRAINT "FK_1f4bedea0d27ed8116ee820adf2"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" DROP CONSTRAINT "FK_4be0b1d4d96f55d481939c200d7"`
    );
    await queryRunner.query(
      `ALTER TABLE "cabinet" DROP CONSTRAINT "FK_c2ccabac9968389a75bef8510ab"`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP CONSTRAINT "FK_1d4f3c9f12d9f5cb2f02fd0dfbf"`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP CONSTRAINT "FK_034fdb6d26b756bddee6191e40c"`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP CONSTRAINT "FK_4b651329ee4b7309a607d14ac2d"`
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_4bae79e46b7d9395a7ebdf86423"`
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
      `ALTER TABLE "panel" DROP CONSTRAINT "FK_88097c43070cdbe7e3038631491"`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" DROP CONSTRAINT "FK_465f68e0f147699c9d436ccba63"`
    );
    await queryRunner.query(
      `ALTER TABLE "panel" DROP CONSTRAINT "FK_ad19449095d9bf65be1a3254b6d"`
    );
    await queryRunner.query(
      `ALTER TABLE "toe_platform" DROP CONSTRAINT "FK_afd5b98fe9128250e0f2e89451d"`
    );
    await queryRunner.query(
      `ALTER TABLE "toe_platform" DROP CONSTRAINT "FK_2388a5ce227f3cac233966f84f2"`
    );
    await queryRunner.query(
      `ALTER TABLE "toe_platform" DROP CONSTRAINT "FK_6e7812e3700583caa59a708f909"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_51f6c2df38a70552c43cd21b7fd"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_91652ab6b75152809d660f0c223"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_a68157a047d125519a20db90547"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_8e68f9dc94fea8e57b3495d197f"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_37ce48d21319094955a199c400e"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_628eb25da0651afc00a6834dde8"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_68fbfdf222f4f8bf92997d59a79"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_e604467cb709c82305c9b8e494b"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_e4edf91113338ef839692ae339e"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_627e759201af8c99a28a1b1c890"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_da65620728ae2bbc7efa713bccd"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_02ca55df3464f2abb1761e240f5"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_cd515fce171feb1032a857bdbbd"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_b7287f0c456fb0b87f5d552456e"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_fbfe321109774ba8af06a36562c"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_ec54589e9ff068039a0e66bbdaa"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_149106a08a60c14d7c0de9538dc"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_39da1e9485eecde1e5e5f756d84"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_02aea25c556d2b94aca5cdeadde"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_ea301ef446549ea0cd769dd92c5"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_92f33cc6026ca42bdd16fda6544"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_6cab12e7fb51afbdd0a5d843d7f"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_bb7eab91775cec38c77d9d162bc"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_55b0c21cb84ea837d608aecf33b"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_af6320d523dbf2f724d5d87e9ad"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_81b4734158e2eb0da07540ff2f1"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_e1967a8bd36b85783a5dffd9c7a"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_c69e489766b2d7b9a6040134ca4"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_09f46d677b43331124b4706f5f5"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_38569d0d543aeb61df7692db9ab"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_bc91d7ae639dfcf8af4f9544524"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_545417288957fdfe03bb8892a06"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_392ba5713e85cd021d12c3e7f99"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_19e35fec818905bd16414209adb"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_27e6f48d908191ffe6546a77aeb"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_26986fd768f918a4adaf23984f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_11d745c9b5c025f590040714f05"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_1226d5c5a199b5b3d56141f0b34"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_559666d049f9d35fa37cb80bfbc"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_69145c4e6f35f4157cb097e0e1c"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_2624a7a03cb1153db3261776f65"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_b0d95d8b0b8d974569bbef878c1"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_ef2c1f1017e0edb47c5f8cc0a70"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_87fa7f0f5bf7567146dfdc22c5b"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_418c57e6a2374d4011e3af5131d"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_87504f92112f32226a6bddf37c6"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_557a62eb04b3172d5ac63ef6399"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_92f7e7da81fc8fdf585537f07ad"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_057e0a34997080a6de4e76caa2a"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_081e07941f2fb6391cc64e5a95c"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_60822fc5bd6eae902498f20edf8"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_5c2e753da0b96d6a6509d33f7c6"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_24200cdbb739c05bf04e9aac75d"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_6d371d82bb70925ca3c633d1a64"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_85c7b64fe939c71a50a8649b024"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_86168563432c6f771aaa66ed999"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_cb1dd2e76a58fce7f2c25e434bb"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_4be9fd4d687d8aed9f338eb23b9"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_6810bbd46db723d2957160f2ca0"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_e840bf2bb2069b0f068c5b04aba"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_34e81bf1a4cf42da4f22605af3b"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_537e0d7096fec29095b87610316"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_7f4c792d22eeb42fd60abab980f"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_5a0c84b151d0a80d4cada8a3f9b"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_50de68d0ec8495d0516e7c02670"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_31986d69264a9499b39cf3cc21c"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_684ec61c782de45bb54b07bd1b2"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_294ff1c1bc1fda676f66395bc52"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_0e233b6699e2aed345394f0e6f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_90e2c250b066a88ca0d7fb7ca9d"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_97ee065b5aa4606db688f8c17cb"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_3716d094e3775f06e1bce81b3f8"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_e7d65cf2b396a7a0040907fa8db"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_4d12b1e7213fe1bce00264b4929"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_ff397f3ca19be85b00b25f99384"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_05e8bf0c123e2709bfbfe24ee42"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_4588174ba3250538d9de986a660"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_91374a1fe8a7c3482f850efd857"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_e930d1af1a35e084d9cbe5ede86"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_803d991398fcecc8703229dc521"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_d1ca9feb449a8f07a697760efa3"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_2a3de3055da6422e0f153498f5b"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_2f449614ea1f7fb14604be57d53"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_d6ec578cf8268edb486a21b82f9"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_a392eb8f59b85fbe5246a57c204"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_08ed9eb06f348215f9a4201aa2f"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_3d00ac966f9c476be270f7d3d75"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_26da84c77d0113b3704e97ef236"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_a52462b5a1bcd290be91124b240"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_174107ff4374a983d2f90087ee5"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_9b60c452a3ef759405b5038cb4c"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_405da74b929f63d5ff7fd9c5063"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_6789a6f903932bf7945fa71f1f9"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_7ec935d62ea5bb2bc5ab146b0e2"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_11cb67d11cffe7e74028263093b"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_2e28b6afe39a4cf3a0078cabc1c"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_1d70ee482180116068d0d777dfb"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_ccfa8543166ad7d4bb39bfde9f9"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_07376358e039dbbd6eba54bd0a2"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_e8da271f8994bab75de7a11a4f9"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_dfd15501aed8b807a9144576504"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_f7c2c1f4a95ebddbeb01fb81585"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_27030242ba76f52d74f0e08a32f"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_5da0ddfc2783b4b5a932a414ab2"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_3ba7104b6d1c7cbbcc7618f8035"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_b5aaae001e74d1255c983363350"`
    );
    await queryRunner.query(
      `ALTER TABLE "material_set" DROP CONSTRAINT "FK_1dd17fdc4733917542bbd299b81"`
    );
    await queryRunner.query(
      `ALTER TABLE "material" DROP CONSTRAINT "FK_e73cc1433934dc2278db9ad565b"`
    );
    await queryRunner.query(
      `ALTER TABLE "material" DROP CONSTRAINT "FK_35ac89da66b3cf49672570116cc"`
    );
    await queryRunner.query(
      `ALTER TABLE "vendor" DROP CONSTRAINT "FK_139dbded1008da1588c16f34a40"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_cbce63a51bd55e471ad58a2dbda"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_bd551bf4a45b25541c68174f3cc"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_dee28060583f244fe5c92a0dcde"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_bf133e1d65980aef25bac8d1788"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_cc436595a4ccee7547b8ff0e077"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_c07b82b17df9269de4842bb106b"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_31a51e9c6ec0ebd475fcb51f246"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_9fa72cf5ab379a5f3ffce1a1d61"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_186ab759f1ee612003fd7cc66d9"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_23c0c1393f987f78acfabfbb98e"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_c90fdd9599e3b80025f4dcb7953"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_58c1a866cdf878654d4ef481489"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_7a8ba0d1692d727839f15bbe6ac"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_0d2c50898360da9b9897abc3640"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_47606a9f30fe87b007613ad49e2"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_ad64ed7f5b3f90c2062a9f07b38"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_a4360707bb3d8af75f1b4999e6e"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_d2e0fcddd6360a95adc9a88e11e"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_b20151dec550432d7a2001b31bf"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_b1079dc4be787dc4d430620d055"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_8ddbfd87c821f3b1f5c0ff8011e"`
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_32aa2914362f4892081c441b70a"`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_ac89e7d1d10e398109385a3deb0"`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_a1c3871b2b1cac747daf8425e57"`
    );
    await queryRunner.query(
      `ALTER TABLE "upcharge" DROP CONSTRAINT "FK_0f8476354a13b64205337caef59"`
    );
    await queryRunner.query(
      `ALTER TABLE "upcharge" DROP CONSTRAINT "FK_9f3fba39bcc108a3ddd2fb5f3fb"`
    );
    await queryRunner.query(
      `ALTER TABLE "upcharge" DROP CONSTRAINT "FK_cb5a90b86bbdd89a67f3f4123d3"`
    );
    await queryRunner.query(
      `ALTER TABLE "upcharge" DROP CONSTRAINT "FK_1f0ba904611d948ab80cd25c542"`
    );
    await queryRunner.query(
      `ALTER TABLE "finish_process" DROP CONSTRAINT "FK_d4380ab5c841952ac49a137a591"`
    );
    await queryRunner.query(
      `ALTER TABLE "paint" DROP CONSTRAINT "FK_fef7a6f06b0faffa29899e5a5de"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_cc52bb1d22b93ebd7d86a88da4d"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_13dd4ad96c9a725eadf48db7558"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_f1ff740d66dc8a05e4af65f7e67"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_250855e1cab1faf90d64bae1830"`
    );
    await queryRunner.query(
      `ALTER TABLE "terms" DROP CONSTRAINT "FK_3eaadcfc34c7011a2e0ea567a84"`
    );
    await queryRunner.query(
      `ALTER TABLE "markup" DROP CONSTRAINT "FK_3835def0b0bbdd4d2df9def4541"`
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_487d70af2ae8a1d665b3c16c1ba"`
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_0b35eeade60c594a9b0b2a61b71"`
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_f18a6fabea7b2a90ab6bf10a650"`
    );
    await queryRunner.query(
      `ALTER TABLE "hardware_set" DROP CONSTRAINT "FK_983ed17172115c526002a54afff"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ebd59c7397fac2dcfc75b1b7a6"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6301083047f356b24452ccc11f"`
    );
    await queryRunner.query(`DROP TABLE "equipment_upcharges_upcharge"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_17cdf5a165515cc0f5973e2678"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9934d21d32c1dc5bc789124c93"`
    );
    await queryRunner.query(`DROP TABLE "model_slab_end_upcharges_upcharge"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d1b3ff6303db9b08d48f612fec"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bca76ba5c830bb61f515ad0399"`
    );
    await queryRunner.query(`DROP TABLE "model_end_panel_upcharges_upcharge"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e689dfb9d52224c730ce4bc47c"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c7a116f3d044373c02283bbd68"`
    );
    await queryRunner.query(
      `DROP TABLE "model_wainscot_panel_upcharges_upcharge"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1a2c2f7951f8e61cb1466ab3f1"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bb2df0d68bf9ed8cb190e085bf"`
    );
    await queryRunner.query(
      `DROP TABLE "model_appliance_panel_upcharges_upcharge"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a715a85bb6c10926bb8ff5ef29"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4b3c00b1021512b42b1fd3f61d"`
    );
    await queryRunner.query(
      `DROP TABLE "model_drawer_front_upcharges_upcharge"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7bb05e5d826ac0bc23e93e3f42"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e3e17e2e61a14a23c632a8609d"`
    );
    await queryRunner.query(`DROP TABLE "model_upper_door_upcharges_upcharge"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3c0232cccb8073f1d7f52d525f"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_33e2f3d6fdc1451adf34f8de22"`
    );
    await queryRunner.query(`DROP TABLE "model_base_door_upcharges_upcharge"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "cabinet"`);
    await queryRunner.query(`DROP TABLE "equipment"`);
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`DROP TABLE "panel"`);
    await queryRunner.query(`DROP TABLE "toe_platform"`);
    await queryRunner.query(`DROP TABLE "material_set"`);
    await queryRunner.query(`DROP TABLE "material"`);
    await queryRunner.query(`DROP TABLE "vendor"`);
    await queryRunner.query(`DROP TABLE "model"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "upcharge"`);
    await queryRunner.query(`DROP TABLE "finish_process"`);
    await queryRunner.query(`DROP TABLE "paint"`);
    await queryRunner.query(`DROP TABLE "job"`);
    await queryRunner.query(`DROP TABLE "terms"`);
    await queryRunner.query(`DROP TABLE "markup"`);
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TABLE "hardware_set"`);
  }
}
