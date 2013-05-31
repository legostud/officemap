class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.integer :location_num
      t.string :name
      t.string :phone

      t.timestamps
    end
  end
end
