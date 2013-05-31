class CreateWorkspaces < ActiveRecord::Migration
  def change
    create_table :workspaces do |t|
      t.integer :location_num
      t.integer :floor
      t.string :name
      t.string :title
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
