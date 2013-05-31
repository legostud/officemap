class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :location_num
      t.integer :x_cord
      t.integer :y_cord

      t.timestamps
    end
  end
end
