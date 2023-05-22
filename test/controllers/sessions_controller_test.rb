# frozen_string_literal: true

require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test '#create logs in user when passing correct credentials' do
    user = User.create(
      username: 'sessiontest',
      password: 'password',
      password_confirmation: 'password'
    )

    post 'http://localhost:3001/login', params: {
      user: {
        password: 'password',
        username: 'sessiontest'
      }
    }
    res = JSON.parse(response.body)
    assert res['logged_in']
    assert res['user']['id'] == user.id
  end

  test '#create renders a 401 when incorrect password supplied' do
    User.create(
      username: 'sessiontest',
      password: 'password',
      password_confirmation: 'password'
    )

    post 'http://localhost:3001/login', params: {
      user: {
        password: 'not correct',
        username: 'sessiontest'
      }
    }
    assert response.body.include?('no such user, please try again')
  end

  test '#is_logged_in? returns current user when user is logged in' do
    user = User.create(
      username: 'sessiontest',
      password: 'password',
      password_confirmation: 'password'
    )

    post 'http://localhost:3001/login', params: {
      user: {
        password: 'password',
        username: 'sessiontest'
      }
    }

    get 'http://localhost:3001/logged_in'

    res = JSON.parse(response.body)
    assert res['logged_in']
    assert res['user']['id'] == user.id
  end

  test '#is_logged_in? returns false when not logged in' do
    get 'http://localhost:3001/logged_in'

    assert response.body.include?('no such user')
    res = JSON.parse(response.body)
    assert_not res['logged_in']
  end

  test '#destroy logs out user' do
    user = User.create(
      username: 'sessiontest',
      password: 'password',
      password_confirmation: 'password'
    )

    post 'http://localhost:3001/login', params: {
      user: {
        password: 'password',
        username: 'sessiontest'
      }
    }

    res = JSON.parse(response.body)
    assert res['logged_in']
    assert res['user']['id'] == user.id

    post 'http://localhost:3001/logout'

    res = JSON.parse(response.body)
    assert res['logged_out']

    get 'http://localhost:3001/logged_in'
    assert response.body.include?('no such user')
  end
end
