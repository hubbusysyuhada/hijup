def token
    result = ''
    temp = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    50.times do
        result += temp[rand(temp.length() - 1)]
    end
    return result
end

Product.destroy_all

Product.create!([
    {
      name: 'Satin Blue'
    },
    {
      name: 'Chiffon Grey'
    },
    {
      name: 'Rayon Black'
    },
    {
      name: 'Satin Black'
    },
    {
      name: 'Rayon Grey'
    }
])

Order.destroy_all

Order.create!([
    {
        code: token()
    },
    {
        code: token()
    },
    {
        code: token()
    }
])