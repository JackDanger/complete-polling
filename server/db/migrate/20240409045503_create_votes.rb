class CreateVotes < ActiveRecord::Migration[7.1]
  def change
    create_table :votes do |t|
      t.integer :poll_id
      t.integer :option_id
      t.integer :user_id

      t.timestamps
    end
  end
end
