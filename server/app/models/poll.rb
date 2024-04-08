class Poll < ApplicationRecord
  has_many :poll_options, -> { order(index: :asc) }, dependent: :destroy

  validates :title, presence: true
  validate :must_have_four_poll_options

  def must_have_four_poll_options
    poll_options.size == 4
  end
end
