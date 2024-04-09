# frozen_string_literal: true

class PollsController < ApplicationController
  def index
    render json: Poll.all.joins(:options)
  end

  def create
    record = Poll.create! params[:poll].permit(:title, :description, options_attributes: :text)
    render json: record
  end

  def show
    record = Poll.joins(:options).find(params[:id])
    render json: record
  end

  def update
    record = Poll.find(params[:id])
    record.update!(params[:poll].permit(:title, :description, options_attributes: :text))
    render json: record
  end
end
