class Workspace < ActiveRecord::Base
  attr_accessible :email, :floor, :location_num, :name, :phone, :title
end
