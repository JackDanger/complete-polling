class Poll < ApplicationRecord
  has_many :poll_options

  validates :title, presence: true
end
