# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer          default(0)
#  user_id    :integer          default(0)
#  content    :text(65535)
#
class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates :post_id, presence: true
  validates :user_id, presence: true

  validates :content, length: { maximum: 2000 }
end
