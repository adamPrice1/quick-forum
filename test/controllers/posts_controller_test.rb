# frozen_string_literal: true

require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  test '#index returns all posts if no user_id is passed' do
    get 'http://localhost:3001/api/posts'
    assert JSON.parse(response.body).length, Post.count
  end

  test '#index returns only users posts if user_id is passed' do
    user = User.create(username: 'user', password_digest: '1234')
    user.posts.create(title: 'test', content: 'test')

    get 'http://localhost:3001/api/posts', as: :json, params: { user_id: user.id }
    posts = JSON.parse(response.body)
    assert posts.length, 1
    assert posts.first['title'] == 'test'
  end

  test '#show returns a 404 unless id is present' do
    get 'http://localhost:3001/api/post', as: :json
    assert_response 404
  end

  test 'show returns successfully if user_id is passed' do
    post = Post.create(
      user: User.first,
      title: 'title',
      content: 'content'
    )
    get 'http://localhost:3001/api/post', as: :json, params: { id: post.id }
    assert JSON.parse(response.body)['id'] == post.id
  end

  test '#create creates a new post with valid parameters' do
    assert_changes -> { Post.count } do
      post 'http://localhost:3001/create-post', params: {
        post: {
          user_id: User.first.id,
          content: 'content',
          title: 'title'
        }
      }
    end
  end

  test '#create doesnt create a comment when invalid params are passed' do
    assert_no_changes -> { Post.count } do
      post 'http://localhost:3001/create-post', params: {
        post: {
          user_id: 0,
          title: 'title',
          content: 'content'
        }
      }
    end
    assert response.body.include?('User must exist')
  end
end
