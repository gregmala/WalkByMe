Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  resources :users, only: [:show, :edit ,:update, :destroy] do
    resources :contacts
    resources :locations
  end


  resources :checkins, only: [:index,:create, :show, :update] do
    member do
      patch "end_trip"
    end
  end



  post '/homesafe_text', to: 'application#homesafe_text'
  post '/danger_text', to: 'application#danger_text'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
