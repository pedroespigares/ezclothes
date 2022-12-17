export class Controllers{

    changeToMainView(views) {
        views.mainView();
    }
    
    setIntervalForCarrousel(images){
        let currentIndex = 0;
        let interval = setInterval(function() {;
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
        let currentIndex = 0;
    
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

        $(".container").css({
            "opacity": "0.1",
            "pointer-events": "none",
        });
        $(".lds-ring").css("display", "inline-block");

        fetch(`https://fakestoreapi.com/products/category/${RealCategory}?sort=${sort}`)
            .then(res=>res.json())
            .then(json=>views.productsView(json, category))
    }
    
    
    changeToAllProductsView(views, sort="asc") {
        $(".container").css({
            "opacity": "0.1",
            "pointer-events": "none",
        });
        $(".lds-ring").css("display", "inline-block");

        fetch(`https://fakestoreapi.com/products?sort=${sort}`)
                .then(res=>res.json())
                .then(json=>views.productsView(json))
    }
    
    changeToProductView(views, ID) {
        $(".container").css({
            "opacity": "0.1",
            "pointer-events": "none",
        });
        $(".lds-ring").css("display", "inline-block");

        fetch(`https://fakestoreapi.com/products/${ID}`)
                .then(res=>res.json())
                .then(json=>views.singleProductView(json))
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
        let createdProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            size: size,
            quantity: 1
        }
    
        let productExists = false;
    
        cart.forEach(function(productInCart) {
            if(productInCart.id == createdProduct.id && productInCart.size == createdProduct.size){
                productInCart.quantity++;
                productExists = true;
            }
        });
    
        if(!productExists){
            cart.push(createdProduct);
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
    
    signUp(){
        fetch('https://fakestoreapi.com/users',{
            method:"POST",
            body:JSON.stringify(
                {
                    email:'John@gmail.com',
                    username:'johnd',
                    password:'m38rmF$',
                    name:{
                        firstname:'John',
                        lastname:'Doe'
                    },
                    address:{
                        city:'kilcoole',
                        street:'7835 new road',
                        number:3,
                        zipcode:'12926-3874',
                        geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                        }
                    },
                    phone:'1-570-236-7033'
                }
            )
        })
            .then(res=>res.json())
            .then(json=> this.signUpHandler(json));
    }

    logIn(){
        fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
            .then(json=>this.logInHandler(json));
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

    signUpHandler(json){
        if(json.id == 1 || json.id == 11){
            $("#signup--message").show(200);
        }

        emailjs.sendForm('service_ysn82m8', 'template_zn2sbrr', '.SU_form')
    }

    logInHandler(json){
        json.forEach(function(user){
            if(user.username == $("#LI_username").val() && user.password == $("#LI_psw").val()){
                $("#login--message").show(200);
            }
        });
    }
}