# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_08_15_172900) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "anxieties", force: :cascade do |t|
    t.string "title", null: false
    t.text "flavor_text", null: false
    t.text "passive", null: false
    t.text "trigger", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "assigned_anxieties", force: :cascade do |t|
    t.bigint "anxiety_id"
    t.bigint "character_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["anxiety_id"], name: "index_assigned_anxieties_on_anxiety_id"
    t.index ["character_id"], name: "index_assigned_anxieties_on_character_id"
  end

  create_table "assigned_items", force: :cascade do |t|
    t.bigint "character_id", null: false
    t.bigint "item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_assigned_items_on_character_id"
    t.index ["item_id"], name: "index_assigned_items_on_item_id"
  end

  create_table "assigned_knacks", force: :cascade do |t|
    t.bigint "character_id", null: false
    t.bigint "knack_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_assigned_knacks_on_character_id"
    t.index ["knack_id"], name: "index_assigned_knacks_on_knack_id"
  end

  create_table "assigned_misfortunes", force: :cascade do |t|
    t.bigint "misfortune_id"
    t.bigint "character_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_assigned_misfortunes_on_character_id"
    t.index ["misfortune_id"], name: "index_assigned_misfortunes_on_misfortune_id"
  end

  create_table "assigned_skills", force: :cascade do |t|
    t.bigint "character_id", null: false
    t.bigint "skill_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_assigned_skills_on_character_id"
    t.index ["skill_id"], name: "index_assigned_skills_on_skill_id"
  end

  create_table "characters", force: :cascade do |t|
    t.bigint "role_id", null: false
    t.bigint "culture_id", null: false
    t.bigint "user_id", null: false
    t.bigint "passion_id", null: false
    t.string "name", null: false
    t.text "description", default: ""
    t.text "bio", default: ""
    t.integer "level", default: 0
    t.integer "experience", default: 0
    t.integer "physique", null: false
    t.integer "motor", null: false
    t.integer "social", null: false
    t.integer "reason", null: false
    t.integer "wits", null: false
    t.integer "athletic", null: false
    t.integer "convincing", null: false
    t.integer "expressive", null: false
    t.integer "graceful", null: false
    t.integer "intuitive", null: false
    t.integer "perceptive", null: false
    t.integer "rugged", null: false
    t.integer "studious", null: false
    t.integer "subtle", null: false
    t.integer "tactile", null: false
    t.integer "combat", null: false
    t.integer "grit", null: false
    t.integer "reflexes", null: false
    t.integer "resolve", null: false
    t.integer "physique_bonus", default: 0
    t.integer "motor_bonus", default: 0
    t.integer "social_bonus", default: 0
    t.integer "reason_bonus", default: 0
    t.integer "wits_bonus", default: 0
    t.integer "athletic_bonus", default: 0
    t.integer "convincing_bonus", default: 0
    t.integer "expressive_bonus", default: 0
    t.integer "graceful_bonus", default: 0
    t.integer "intuitive_bonus", default: 0
    t.integer "perceptive_bonus", default: 0
    t.integer "rugged_bonus", default: 0
    t.integer "studious_bonus", default: 0
    t.integer "subtle_bonus", default: 0
    t.integer "tactile_bonus", default: 0
    t.integer "combat_bonus", default: 0
    t.integer "grit_bonus", default: 0
    t.integer "reflexes_bonus", default: 0
    t.integer "resolve_bonus", default: 0
    t.integer "current_health", default: 0
    t.integer "current_stress", default: 0
    t.integer "current_rest_pool", default: 0
    t.integer "current_vitality", default: 3
    t.integer "base_health", default: 0
    t.integer "base_willpower", default: 0
    t.integer "base_rest_pool", default: 0
    t.integer "bonus_to_health", default: 0
    t.integer "bonus_to_willpower", default: 0
    t.integer "bonus_to_rest_pool", default: 0
    t.integer "supplies", default: 0
    t.integer "wealth", default: 0
    t.integer "bonus_to_carry_capacity", default: 0
    t.index ["culture_id"], name: "index_characters_on_culture_id"
    t.index ["passion_id"], name: "index_characters_on_passion_id"
    t.index ["role_id"], name: "index_characters_on_role_id"
    t.index ["user_id"], name: "index_characters_on_user_id"
  end

  create_table "cultures", force: :cascade do |t|
    t.string "title", null: false
    t.string "aspect_bonuses", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "title", null: false
    t.string "category", null: false
    t.string "sub_category", null: false
    t.string "tags", null: false
    t.string "damage"
    t.string "reach"
    t.integer "toughness"
    t.integer "durability"
    t.text "flavor_text", default: "None"
    t.text "rules_text", null: false
    t.float "bulk", null: false
    t.string "crafting_repair_string", default: ""
    t.integer "uses", default: 0
    t.string "action_type", default: "None"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "knacks", force: :cascade do |t|
    t.string "title", null: false
    t.text "rules_text", null: false
    t.text "options", default: "None"
    t.bigint "role_id"
    t.bigint "culture_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["culture_id"], name: "index_knacks_on_culture_id"
    t.index ["role_id"], name: "index_knacks_on_role_id"
  end

  create_table "misfortunes", force: :cascade do |t|
    t.string "title", null: false
    t.text "flavor_text", null: false
    t.text "passive", null: false
    t.text "trigger", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "passions", force: :cascade do |t|
    t.string "title", null: false
    t.text "flavor_text", null: false
    t.text "passive", null: false
    t.text "trigger", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.text "growth", null: false
    t.text "training", null: false
    t.text "proficiencies", null: false
    t.integer "combat_die", null: false
    t.string "reaction_bonus", null: false
    t.string "ability_title", null: false
    t.text "ability_text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills", force: :cascade do |t|
    t.string "title", null: false
    t.string "action_type", null: false
    t.boolean "focus", default: false
    t.string "trigger", default: "None"
    t.text "rules_text", null: false
    t.text "options", default: "None"
    t.boolean "starting", default: false
    t.bigint "role_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_skills_on_role_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
