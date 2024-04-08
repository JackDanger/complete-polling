class CreatePollOptions < ActiveRecord::Migration[7.1]
  def change
    create_table :poll_options do |t|
      t.integer :poll_id
      t.string :text
      t.integer :index

      t.timestamps
    end
  end
end
