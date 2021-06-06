Rails.application.routes.draw do

  root 'hijup#home'

  get 'products' => 'pages#products'

  get 'order' => 'pages#order'
  
  resources :hijup

end
