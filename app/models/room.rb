class Room < ActiveRecord::Base
  attr_accessible :location_num, :name, :phone, :floor
end
