# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'home_page#home_page'

  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  post '/create-user', to: 'users#create'
  post '/create-comment', to: 'comments#create'
  post '/create-post', to: 'posts#create'
  get '/logged_in', to: 'sessions#is_logged_in?'
  get '/api/posts', to: 'posts#index'
  get '/api/post', to: 'posts#show'
  get '*path', to: 'home_page#home_page'
end
