class AddTitleAndContentToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :title, :string, null: false
    add_column :posts, :content, :text, null: false
  end
end
