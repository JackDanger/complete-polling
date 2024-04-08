class SubmissionsController < ApplicationController
  def index
    render json: Submission.where(user_id: current_user_id).all
  end

  def create
    record = Submission.create!(user_id: current_user_id, *params[:submission].permit(:poll_id, :poll_option_id))
    render json: record
  end
end
