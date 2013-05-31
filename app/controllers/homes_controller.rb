class HomesController < ApplicationController

	def index
		@room_names = Room.select("id, name")
		@employee_names = Workspace.select("id, name")

		@all_names = @room_names + @employee_names
		
		respond_to do |format|
		  format.html # index.html.erb
		  format.json { render json: @all_names }
		end


	end

end
