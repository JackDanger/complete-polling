class VotesController < ApplicationController
  def index
    render json: Vote.all
  end

  def show
    render json: {vote: vote}
  end

  def create
    vote.destroy! if vote
    option = PollOption.where(poll_id: params[:poll_id]).find(params[:option_id])
    render json: {vote: Vote.create!(poll_id: option.poll_id, option_id: params[:option_id])}
  end

  private

  def vote
    @vote ||= Vote.where(poll_id: params[:poll_id]).first
  end
end
