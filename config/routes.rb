Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  resources :users, only: [:show, :edit ,:update, :destroy] do
    resources :contacts
    resources :locations
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
