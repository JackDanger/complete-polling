class Poll < ApplicationRecord
  has_many :options, -> { order(index: :asc) }, dependent: :destroy, class_name: 'PollOption'

  validates :title, presence: true
  validate :must_have_four_poll_options

  def must_have_four_poll_options
    unless options.size == 4
      errors.add "Must have 4 poll options for now. Let's keep this app simple."
    end
  end
end
