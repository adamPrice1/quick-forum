# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'is invalid if username is not unique' do
    User.create(
      username: 'already-taken',
      password_digest: '123456'
    )
    user = User.new(
      username: 'already-taken',
      password_digest: '234567'
    )
    assert_not user.valid?
  end

  test 'is valid if all conditions are met' do
    user = User.new(
      username: 'not-taken',
      password_digest: '234567'
    )
    assert user.valid?
  end
end
