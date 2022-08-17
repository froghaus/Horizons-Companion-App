class CreateCharactersAndAssortedElements < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.belongs_to :role, null: false
      t.belongs_to :culture, null: false
      t.belongs_to :user, null: false
      t.belongs_to :passion, null: false

      t.string :name, null: false
      t.text :description, default: ""
      t.text :bio, default: ""
      t.integer :level, default: 0
      t.integer :experience, default: 0

      t.integer :physique, null: false
      t.integer :motor, null: false
      t.integer :social, null: false
      t.integer :reason, null: false
      t.integer :wits, null: false
      
      t.integer :athletic, null: false
      t.integer :convincing, null: false
      t.integer :expressive, null: false
      t.integer :graceful, null: false
      t.integer :intuitive, null: false
      t.integer :perceptive, null: false
      t.integer :rugged, null: false
      t.integer :studious, null: false
      t.integer :subtle, null: false
      t.integer :tactile, null: false
      t.integer :combat, null: false

      t.integer :grit, null: false
      t.integer :reflexes, null: false
      t.integer :resolve, null: false

      t.integer :physique_bonus, default: 0
      t.integer :motor_bonus, default: 0
      t.integer :social_bonus, default: 0
      t.integer :reason_bonus, default: 0
      t.integer :wits_bonus, default: 0
      
      t.integer :athletic_bonus, default: 0
      t.integer :convincing_bonus, default: 0
      t.integer :expressive_bonus, default: 0
      t.integer :graceful_bonus, default: 0
      t.integer :intuitive_bonus, default: 0
      t.integer :perceptive_bonus, default: 0
      t.integer :rugged_bonus, default: 0
      t.integer :studious_bonus, default: 0
      t.integer :subtle_bonus, default: 0
      t.integer :tactile_bonus, default: 0
      t.integer :combat_bonus, default: 0

      t.integer :grit_bonus, default: 0
      t.integer :reflexes_bonus, default: 0
      t.integer :resolve_bonus, default: 0

      t.integer :current_health, default: 0
      t.integer :current_stress, default: 0
      t.integer :current_rest_pool, default: 0
      t.integer :current_vitality, default: 3

      t.integer :base_health, default: 0
      t.integer :base_willpower, default: 0
      t.integer :base_rest_pool, default: 0

      t.integer :bonus_to_health, default: 0
      t.integer :bonus_to_willpower, default: 0
      t.integer :bonus_to_rest_pool, default: 0

      t.integer :supplies, default: 0
      t.integer :wealth, default: 0
      t.integer :bonus_to_carry_capacity, default: 0

    end

    create_table :cultures do |t|
      t.string :title, null: false
      t.string :aspect_bonuses, null: false
      t.text :description, null: false

      t.timestamps null: false
    end

    create_table :roles do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.text :growth, null: false
      t.text :training, null: false
      t.text :proficiencies, null: false
      t.integer :combat_die, null: false
      t.string :reaction_bonus, null: false
      t.string :ability_title, null: false
      t.text :ability_text, null: false

      t.timestamps null: false
    end

    create_table :skills do |t|
      t.string :title, null: false
      t.string :action_type, null: false
      t.boolean :focus, default: false
      t.string :trigger, default: "None"
      t.text :rules_text, null: false
      t.text :options, default: "None"
      t.boolean :starting, default: false

      t.belongs_to :role, null: false

      t.timestamps null: false
    end

    create_table :assigned_skills do |t|
      t.belongs_to :character, null: false
      t.belongs_to :skill, null: false

      t.timestamps null: false
    end

    create_table :knacks do |t|
      t.string :title, null: false
      t.text :rules_text, null: false
      t.text :options, default: "None"

      t.belongs_to :role
      t.belongs_to :culture

      t.timestamps null: false
    end

    create_table :assigned_knacks do |t|
      t.belongs_to :character, null: false
      t.belongs_to :knack, null: false

      t.timestamps null: false
    end

    create_table :items do |t|
      t.string :title, null: false
      t.string :category, null: false
      t.string :sub_category, null: false
      t.string :tags, null: false
      t.string :damage
      t.string :reach
      t.integer :toughness
      t.integer :durability
      t.text :flavor_text, default: "None"
      t.text :rules_text, null: false
      t.float :bulk, null: false
      t.string :crafting_repair_string, default: ""
      t.integer :uses, default: 0
      t.string :action_type, default: "None"

      t.timestamps null: false
    end

    create_table :assigned_items do |t|
      t.belongs_to :character, null: false
      t.belongs_to :item, null: false

      t.timestamps null: false
    end

    create_table :passions do |t|
      t.string :title, null: false
      t.text :flavor_text, null: false
      t.text :passive, null: false
      t.text :trigger, null: false

      t.timestamps null: false
    end

    create_table :misfortunes do |t|
      t.string :title, null: false
      t.text :flavor_text, null: false
      t.text :passive, null: false
      t.text :trigger, null: false

      t.timestamps null: false
    end

    create_table :assigned_misfortunes do |t|
      t.belongs_to :misfortune
      t.belongs_to :character     
      
      t.timestamps null: false
    end

    create_table :anxieties do |t|
      t.string :title, null: false
      t.text :flavor_text, null: false
      t.text :passive, null: false
      t.text :trigger, null: false

      t.timestamps null: false
    end

    create_table :assigned_anxieties do |t|
      t.belongs_to :anxiety
      t.belongs_to :character

      t.timestamps null: false
    end

  end
end
