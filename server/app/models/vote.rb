class Vote < ApplicationRecord
  belongs_to :poll
  belongs_to :option, class_name: 'PollOption'
end
