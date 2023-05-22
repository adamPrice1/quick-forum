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
require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  test 'is invalid if there is no associated post' do
    comment = Comment.new(
      post_id: 0,
      user: User.first,
      content: 'lorem ipsum dolor amet'
    )
    assert_not comment.valid?
  end

  test 'is invalid if there is no associated user' do
    comment = Comment.new(
      post: Post.first,
      user_id: 0,
      content: 'lorem ipsum dolor amet'
    )
    assert_not comment.valid?
  end

  test 'is invalid if content is over 2000 chars in length' do
    comment = Comment.new(
      post: Post.first,
      user: User.first,
      content: 'A' * 2001
    )
    assert_not comment.valid?
  end

  test 'is valid if all conditions are satisfied' do
    comment = Comment.new(
      post: Post.first,
      user: User.first,
      content: 'A' * 1999
    )
    assert comment.valid?
  end
end
