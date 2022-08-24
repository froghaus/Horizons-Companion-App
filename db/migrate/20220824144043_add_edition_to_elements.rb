class AddEditionToElements < ActiveRecord::Migration[5.2]
  def change
    add_reference :roles, :edition, default: 1
    add_reference :cultures, :edition, default: 1
  end
end
