# frozen_string_literal: true

require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test '#create creates a new user with valid parameters' do
    assert_changes -> { User.count } do
      post 'http://localhost:3001/create-user', params: {
        user: {
          username: 'username',
          password: 'password',
          password_confirmation: 'password'
        }
      }
    end
  end

  test '#create doesnt create a user when invalid params are passed' do
    assert_no_changes -> { User.count } do
      post 'http://localhost:3001/create-user', params: {
        user: {
          username: 'username',
          password: 'password',
          password_confirmation: 'no-match'
        }
      }
    end
    assert response.body.include?("Password confirmation doesn't match Password")
  end
end
