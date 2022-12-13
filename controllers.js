export class Controllers{

    changeToMainView(views) {
        views.mainView();
    }
    
    setIntervalForCarrousel(images){
        var currentIndex = 0;
        var interval = setInterval(function() {;
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            $("#carrousel-img").fadeOut(1000, function() {
                $(this).attr("src", images[currentIndex]);
                $(this).fadeIn(1000);
            });
        }, 5000);
    }
    
    changeImageCarrousel(images, direction) {
        var currentIndex = 0;
    
        if(direction == "left"){
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }
        } else if(direction == "right"){
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
        }
    
        $("#carrousel-img").fadeOut(1000, function() {
            $(this).attr("src", images[currentIndex]);
            $(this).fadeIn(1000);
        });
    }
    
    changeViewsBetweenCategories(category, views, sort="asc") {
        if(category == "woman"){
            var RealCategory = "women\'s%20clothing";
        } else if(category == "men"){
            var RealCategory = "men\'s%20clothing";
        } else if(category == "jewelery"){
            var RealCategory = "jewelery";
        } else if(category == "electronics"){
            var RealCategory = "electronics";
        }

        $(".container").html("");
        let loader = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
        $(".container").append(loader);

        fetch(`https://fakestoreapi.com/products/category/${RealCategory}?sort=${sort}`)
            .then(res=>res.json())
            .then(json=>views.productsView(json, category))
            .then(function(){
                $(".lds-ring").css("display", "none");
            });
    }
    
    
    changeToAllProductsView(views, sort="asc") {
        $(".container").html("");
        let loader = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
        $(".container").append(loader);

        fetch(`https://fakestoreapi.com/products?sort=${sort}`)
                .then(res=>res.json())
                .then(json=>views.productsView(json))
                .then(function(){
                    $(".lds-ring").css("display", "none");
                });
    }
    
    changeToProductView(views, ID) {
        $(".container").html("");
        let loader = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
        $(".container").append(loader);

        fetch(`https://fakestoreapi.com/products/${ID}`)
                .then(res=>res.json())
                .then(json=>views.singleProductView(json))
                .then(function(){
                    $(".lds-ring").css("display", "none");
                });
    }

    sortProducts(order, category, views) {
        if(category=="all"){
            this.changeToAllProductsView(views, order);
        } else {
            this.changeViewsBetweenCategories(category, views, order)
        }
    }
    
    changeToLogIn(views) {
        views.logInView();
    }
    
    addProductToCart(product, size, cart) {
        var product = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            size: size,
            quantity: 1
        }
    
        var productExists = false;
    
        cart.forEach(function(productInCart) {
            if(productInCart.id == product.id){
                productInCart.quantity++;
                productExists = true;
            }
        });
    
        if(!productExists){
            cart.push(product);
        }
    
        localStorage.cart = JSON.stringify(cart);
    }
    
    removeProductFromCart(ID, cart) {
        cart.forEach(function(productInCart, index) {
            if(productInCart.id == ID){
                cart.splice(index, 1);
            }
        });
    
        localStorage.cart = JSON.stringify(cart);
    }
    
    updateProductQuantity(ID, quantity, cart) {
        cart.forEach(function(productInCart) {
            if(productInCart.id == ID){
                productInCart.quantity = quantity;
            }
        });
    
        localStorage.cart = JSON.stringify(cart);
    }
    
    signUp(json){
        if(json.id == 1 || json.id == 11){
            $("#signup--message").show(200);
        }
    }

    logIn(json){
        if(json.token == "eyJhbGciOiJIUzI1NiIsInR"){
            $("#login--message").show(200);
        }
    }

    newsLetterSuscription(){
        $("#NL--message").show(200);
    }
    
    changeToShoppingCart(views, cart) {
        views.cartView(cart);
    }

    changeToCheckout(views){
        views.checkoutView();
    }

    changeToPayment(views){
        views.paymentView();
    }
}