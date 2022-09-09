class CreateCampaigns < ActiveRecord::Migration[5.2]
  def change
    create_table :campaigns do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :passcode, default: nil
      
      t.belongs_to :user

      t.timestamps null: false
    end

    create_table :players do |t|
      t.belongs_to :user
      t.belongs_to :campaign

      t.timestamps null: false
    end

    add_reference :characters, :campaign, default: nil
  end
end
