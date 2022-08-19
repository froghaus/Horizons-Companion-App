Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/characters", to: "homes#show"
  get "/characters/new", to: "homes#show"
  get "/characters/:id", to: "homes#show"

  namespace :api do
    namespace :v1 do
      resources :characters, only: [:index, :show, :new, :create]
    end
  end

end
