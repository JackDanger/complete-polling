# frozen_string_literal: true

class PollsController < ApplicationController
  def index
    render json: Poll.all.includes(:options)
  end

  def create
    require 'pry'
    record = Poll.create! params[:poll].permit(:title, :description, options_attributes: [:id, :text, :index])
    render json: record
  end

  def show
    record = Poll.includes(:options).find(params[:id])
    render json: record
  end

  def update
    record = Poll.find(params[:id])
    record.update!(params[:poll].permit(:title, :description, options_attributes: [:id, :text, :index]))
    render json: record
  end

  def destroy
    record = Poll.find(params[:id])
    record.destroy!
    render json: {}
  end
end
