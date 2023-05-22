# frozen_string_literal: true

require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest
  test '#create creates a new comment with valid parameters' do
    assert_changes -> { Comment.count } do
      post 'http://localhost/create-comment', params: {
        comment: {
          user_id: User.first.id,
          post_id: Post.first.id,
          content: 'content'
        }
      }
    end
  end

  test '#create doesnt create a comment when invalid params are passed' do
    assert_no_changes -> { Comment.count } do
      post 'http://localhost/create-comment', params: {
        comment: {
          user_id: User.first.id,
          post_id: 0,
          content: 'content'
        }
      }
    end
    assert response.body.include?('Post must exist')
  end
end
