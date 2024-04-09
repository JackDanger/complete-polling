# frozen_string_literal: true

class Submission < ApplicationRecord
  belongs_to :poll
  belongs_to :poll_option
end
