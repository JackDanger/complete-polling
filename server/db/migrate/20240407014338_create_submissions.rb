class CreateSubmissions < ActiveRecord::Migration[7.1]
  def change
    create_table :submissions do |t|
      t.integer :poll_id
      t.integer :poll_option_id
      t.integer :user_id

      t.timestamps
    end
  end
end
