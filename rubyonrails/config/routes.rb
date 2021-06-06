Rails.application.routes.draw do

  resources :products
  resources :orders
  root 'hijup#home'

  get 'products' => 'pages#products'

  get 'order' => 'pages#order'
  
  resources :product

end
