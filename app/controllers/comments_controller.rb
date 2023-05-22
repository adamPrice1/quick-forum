# frozen_string_literal: true

# Controller for comments
class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: {
        status: :created,
        comment: @comment
      }
    else
      render json: {
        status: 500,
        errors: @comment.errors.full_messages
      }
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def comment_params
    params.require(:comment).permit(:user_id, :post_id, :content)
  end
end
