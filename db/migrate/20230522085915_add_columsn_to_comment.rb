class AddColumsnToComment < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :post_id, :integer, null: false
    add_column :comments, :user_id, :integer, null: false
    add_column :comments, :content, :text, null: false
  end
end
