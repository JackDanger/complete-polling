class PollsController < ApplicationController

  def index
    render json: Poll.all.includes(:options)
  end

  def create
    record = Poll.create! params[:poll].permit(:title, :description, :options)
    render json: record
  end

  def show
    record = Poll.includes(:options).find(params[:id])
    render json: record
  end

  def update
    record = Poll.find(params[:id])
    record.update!(params[:poll].permit(:title, :description, :options))
    render json: record
  end

end
