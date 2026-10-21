const category_nav_list = document.querySelector('.category-nav-list');

function open_Category_List(){
    category_nav_list.classList.toggle("active")
}


var cart = document.querySelector('.cart');

function open_close_cart(){
    cart.classList.toggle('active');
}

function open_menu(){
    const nav_links =document.querySelector('.nav-links');
    nav_links.classList.toggle('active')
}




fetch('products.json').
then(response =>response.json()). 
then(data=>{
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    
    addToCartButtons.forEach(button=>{

        button.addEventListener('click', (event)=>{
            const productId = event.currentTarget.getAttribute('data-id');
            const selcetedProduct = data.find(product => product.id == productId)
            
            
            addToCart(selcetedProduct)
            const allMatchingButton = document.querySelectorAll(`.btn-add-cart[data-id="${productId}"]`);
            allMatchingButton.forEach(btn =>{
                btn.classList.add('active')
                btn.innerHTML=`<i class="fa-solid fa-cart-flatbed"></i> Item In Cart`
            })
        })

    })

})




function addToCart(product) {


let cart  = JSON.parse(localStorage.getItem('cart')) || []
cart.push({ ...product , quantity:1})
localStorage.setItem('cart' , JSON.stringify(cart))
    updateCart()
}






function updateCart(){
    const cartItemContainer = document.getElementById('cart_items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkout_items = document.getElementById('checkout_items');

        let items_input = document.getElementById('items');
        let total_price_input = document.getElementById('total_price');
        let count_items_input = document.getElementById('count_items');

    if (checkout_items){
        checkout_items.innerHTML= "";



        items_input.value = "";
        total_price_input.value = "";
        count_items_input.value = "";
    }

    let total_price = 0;
    let total_count = 0;
    cartItemContainer.innerHTML ="";
    cart.forEach((item, index) =>{

        let total_price_item = item.quantity * item.price;

        total_price +=  total_price_item;
        total_count += item.quantity;


        //check out inputs

        if (checkout_items){

        items_input.value += item.name + " ----- " + "price : " + total_price_item + " ----- " + "count : " + item.quantity + "\n";

        total_price_input.value = total_price + 20;
        count_items_input.value = total_count ;
            }
        cartItemContainer.innerHTML +=`
        
        <div class="item_cart">
                <img src="${item.img}" alt="">
                <div class="content">
                    <h4>${item.name}</h4>
                    <p class="price_cart">$${total_price_item}</p>
                    <div class="quantity_control">
                    <button class="decrease_quantity" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase_quantity" data-index="${index}">+</button>
                </div>
                </div>
                <button class="delete_item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>  
            </div>

        `
        if (checkout_items){

            checkout_items.innerHTML += `
            <div class="item_cart">
                            <div class="image_name">
                                <img src="${item.img}" alt="">
                                <div class="content">
                                    <h4>${item.name}</h4>
                                    <p class="price_cart">$${total_price_item}</p>
                                    <div class="quantity_control">
                                        <button class="decrease_quantity" data-index="${index}">-</button>
                                        <span class="quantity">${item.quantity}</span>
                                        <button class="increase_quantity" data-index="${index}">+</button>
                                    </div>
                                </div>
                            </div>

                            <button class="delete_item"> <i class="fa-solid fa-trash-can"></i> </button>
                        </div>
            `

        }


    })

    const price_cart_total = document.querySelector('.price_cart_total');
        price_cart_total.innerHTML= `$${total_price}`;

    const count_item_cart = document.querySelector('.count_item_cart');
        count_item_cart.innerHTML = total_count;

    const count_item_header = document.querySelector('.count-item-header');
        count_item_header.innerHTML = total_count;
    
    if (checkout_items){
        const subtotal_checkout = document.querySelector('.subtotal_checkout');
        const total_checkout = document.querySelector('.total_checkout');

        subtotal_checkout.innerHTML = `$${total_price}`;
        total_checkout.innerHTML = `$${total_price > 0 ? total_price +20 : 0}`;

    }

    const increaseButtons = document.querySelectorAll('.increase_quantity');

    increaseButtons.forEach(button=>{
        button.addEventListener('click' , (e)=>{
        const itemIndex = e.currentTarget.getAttribute('data-index');
            
            increaseQuantity(itemIndex);
        })
    })


    const decreaseButtons = document.querySelectorAll('.decrease_quantity');

    decreaseButtons.forEach(button =>{
        button.addEventListener('click' , (e)=>{
            const itemIndex = e.target.getAttribute('data-index');
            
            decreaseQuantity(itemIndex);
        })
    })

    


    const deletButtons = document.querySelectorAll('.delete_item');
    deletButtons.forEach(button=>{
        button.addEventListener('click', (e)=>{

            const itemIndex = e.target.closest('button').getAttribute('data-index')
            
            removeFromCart(itemIndex)

            
        })
    })
    

}

function increaseQuantity(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart[index].quantity += 1;
    localStorage.setItem('cart'  , JSON.stringify(cart))

    updateCart()
}



function decreaseQuantity(index){
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if( cart[index].quantity >   1    ){
cart[index].quantity -= 1;
        }
        
        localStorage.setItem('cart'  , JSON.stringify(cart))

    updateCart()

}

function removeFromCart(index){
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const removeProduct = cart.splice(index , 1)[0];
        localStorage.setItem('cart'  , JSON.stringify(cart))
        updateCart();
        updateButtonState(removeProduct.id)
}


function updateButtonState(productId){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const allMatchingButton = document.querySelectorAll(`.btn-add-cart[data-id="${productId}"]`);
    allMatchingButton.forEach(button=>{
        button.classList.remove('active');
        button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> add to cart
                                </span>`
    })

    
}



updateCart();

