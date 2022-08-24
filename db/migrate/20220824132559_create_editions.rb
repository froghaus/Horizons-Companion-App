class CreateEditions < ActiveRecord::Migration[5.2]
  def change
    create_table :editions do |t|
      t.string :title, null: false
      t.timestamps null: false
    end
  end
end
