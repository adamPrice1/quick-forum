# frozen_string_literal: true

# defines methods for interacting with posts
class PostsController < ApplicationController
  def index
    @posts = if params[:user_id]
               Post.where(user_id: params[:user_id])
             else
               Post.all
             end
    render json: @posts.as_json(include: { user: { only: :username } })
  end

  def show
    if params[:id]
      render json: Post.find(params[:id]).as_json(include: {
                                                    comments: {
                                                      include: { user: { only: :username } }
                                                    }
                                                  })
    else
      render status: :not_found, json: '{"No user_id supplied"}'
    end
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: {
        status: :created,
        post: @post
      }
    else
      render json: {
        status: 500,
        errors: @post.errors.full_messages
      }
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :user_id)
  end
end
