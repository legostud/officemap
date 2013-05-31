class AddFloorToRooms < ActiveRecord::Migration
  def change
    add_column :rooms, :floor, :integer
  end
end
