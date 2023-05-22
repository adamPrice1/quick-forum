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
require 'test_helper'

class PostTest < ActiveSupport::TestCase
  test 'is invalid if user is not created' do
    post = Post.new(
      user_id: 0,
      title: 'title',
      content: 'content'
    )
    assert_not post.valid?
  end

  test 'is invalid if content is too long' do
    post = Post.new(
      user: User.first,
      title: 'title',
      content: 'A' * 2001
    )
    assert_not post.valid?
  end

  test 'is invalid if title is too long' do
    post = Post.new(
      user: User.first,
      title: 'A' * 201,
      content: 'content'
    )
    assert_not post.valid?
  end

  test 'is valid if all conditions are met' do
    post = Post.new(
      user: User.first,
      title: 'A' * 199,
      content: 'A' * 1999
    )
    assert post.valid?
  end
end
