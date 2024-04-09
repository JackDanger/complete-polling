# frozen_string_literal: true

class Poll < ApplicationRecord
  has_many :options, -> { order(index: :asc) }, dependent: :destroy, class_name: 'PollOption'
  accepts_nested_attributes_for :options

  validates :title, presence: true
  validate :must_have_four_poll_options

  def must_have_four_poll_options
    return if options.size == 4

    errors.add :base, "Must have 4 poll options for now. Let's keep this app simple."
  end
end
