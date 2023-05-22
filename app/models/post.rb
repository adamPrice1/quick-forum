# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#  title      :string(255)      not null
#  content    :text(65535)      not null
#
class Post < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 200 }
  validates :content, presence: true, length: { maximum: 2000 }
  validates :user_id, presence: true

  has_many :comments, dependent: :destroy
end
