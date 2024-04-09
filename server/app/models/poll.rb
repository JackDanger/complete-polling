# frozen_string_literal: true

class Poll < ApplicationRecord
  has_many :options, -> { order(index: :asc) }, dependent: :destroy, class_name: 'PollOption'
  accepts_nested_attributes_for :options

  validates :title, presence: true
end
