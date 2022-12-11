import { Views } from "./views.js";
import {Controllers} from "./controllers.js";
const views = new Views();
const controllers = new Controllers();

emailjs.init('c2I8uIaHDDPg57Fj5');

const images = [
    "./media/carrousel/couple.jpg",
    "./media/carrousel/hombre.jpg",
    "./media/carrousel/jugador.jpg",
    "./media/carrousel/mujer.jpg",
    "./media/carrousel/hombre_bn.jpg",
    "./media/carrousel/hombre_chaqueta.jpg",
    "./media/carrousel/fondo_azul.jpg",
];

if(localStorage.getItem("cart") === null) {
    var cart = [];
}
else {
    var cart = JSON.parse(localStorage.getItem("cart"));
}

$(document).ready(function() {
    // Carrousel de imagenes que se cambian cada 5 segundos y tiene animacion de fadeIn

    $(".container").text(controllers.changeToMainView(views));
    
    controllers.setIntervalForCarrousel(images);

    // El on sirve para que sea dinamico, ya que si no se le pone el on, no se podria hacer click en los botones 
    // de las categorias porque no existen al cargar la pagina

    // Es document .on junto el selector y el evento que se quiere que se ejecute



    // Eventos que llevan a la vista principal

    $(document).on("click", ".logo", function() {
        controllers.changeToMainView(views);
    });



    // Eventos que llevan a la vista de todos los productos

    $(document).on("click", "#carrousel-img", function() {
        controllers.changeToAllProductsView(views);
    });

    $(document).on("click", "#christmas img", function() {
        controllers.changeToAllProductsView(views);
    });
    
    $(document).on("click", "#productsLink", function() {
        controllers.changeToAllProductsView(views);
    });

    $(document).on("click", "#seeAllProductsButton", function() {
        controllers.changeToAllProductsView(views);
    });



    // Eventos que controlan el carrousel

    $(document).on("click", ".carrousel--btn-left", function() {
        controllers.changeImageCarrousel(images, "left");
    });
    
    $(document).on("click", ".carrousel--btn-right", function() {
        controllers.changeImageCarrousel(images, "right");
    });
    


    // Eventos que llevan a la vista de productos por categoria
    
    $(document).on("click", "#woman", function() {
        controllers.changeViewsBetweenCategories("woman",views);
    });
    
    $(document).on("click", "#men", function() {
        controllers.changeViewsBetweenCategories("men", views);
    });
    
    $(document).on("click", "#jewelery", function() {
        controllers.changeViewsBetweenCategories("jewelery", views);
    });
    
    $(document).on("click", "#accesories", function() {
        controllers.changeViewsBetweenCategories("electronics", views);
    });
    


    // Cambiar el orden de los productos al pulsar el boton de ordenar

    $(document).on("click", ".sort--button", function() {
        var order = $("#sort").val();
        var category = $("#categoryForSort").val();
        controllers.sortProducts(order, category ,views);
    });
    


    // Evento que llevan a la vista de login y lo manejan, junto a los eventos de correo

    $(document).on("click", ".fa-user", function() {
        controllers.changeToLogIn(views);
    });

    $(document).on("submit", ".LI_form", function(e) {
        e.preventDefault();
        
        fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            body:JSON.stringify({
                username: "mor_2314",
                password: "83r5^_"
            })
        })
            .then(res=>res.json())
            .then(json=>controllers.logIn(json))
    });

    $(document).on("submit", ".SU_form", function(e) {
        e.preventDefault();

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
            .then(json=> controllers.signUp(json))

        emailjs.sendForm('service_ysn82m8', 'template_zn2sbrr', '.SU_form')
    });



    // Evento que llevan a la vista de producto

    $(document).on("click", ".product--img", function() {
        var ID = $(this).siblings("#product--id--all-products").val();
        controllers.changeToProductView(views, ID);
    });

    $(document).on("click", ".product--title", function() {
        var ID = $(this).siblings("#product--id--all-products").val();
        controllers.changeToProductView(views, ID);
    });

    $(document).on("click", "#cart--title--link", function() {
        var ID = $(this).siblings("#product--id--cart").val();
        controllers.changeToProductView(views, ID);
    });



    // Eventos que llevan a la vista de carrito y lo manejan

    $(document).on("click", ".add-to-cart", function() {
        var ID = $(this).siblings("#product--id--single-product").val();
        var size = $(this).siblings(".tallas").children(".size").val();

        fetch(`https://fakestoreapi.com/products/${ID}`)
            .then(res=>res.json())
            .then(json=>controllers.addProductToCart(json, size, cart));

        $(this).animate({"background-color": "green"}, 500);
        $(this).text("Added to cart");
        $(this).effect("bounce", {times: 2}, 1000);
    });

    $(document).on("click", ".fa-shopping-cart", function() {
        controllers.changeToShoppingCart(views, cart);
    });

    $(document).on("click", ".remove-from-cart", function() {
        var ID = $(this).siblings("#product--id--cart").val();
        $(this).parent().fadeOut(500, function() {
            controllers.removeProductFromCart(ID, cart);
            controllers.changeToShoppingCart(views, cart);
        });
    });

    $(document).on("click", ".update-from-cart", function() {
        var ID = $(this).siblings("#product--id--cart").val();
        var quantity = $(this).siblings("#product--quantity").val();
        controllers.updateProductQuantity(ID, quantity, cart);
        controllers.changeToShoppingCart(views, cart);
    });

    $(document).on("click", ".buy", function() {
        controllers.changeToCheckout(views);
    });

    $(document).on("submit", ".checkout--form--container", function(e) {
        e.preventDefault();
        $("#buy--message").show(200);

        emailjs.sendForm('service_ysn82m8', 'template_x1zagzk', '.checkout--form--container')
    });

    // Evento para el menu hamburguesa

    $(document).on("click", ".hamburger-lines", function() {
        $(".checkbtn").toggleClass("open");
        $("body").toggleClass("fixed_position");
      });
    
      // Cerrar menu al pulsar enlace
    $(document).on("click", ".menu a", function() {
        $(".checkbtn").removeClass("open");
        $("body").removeClass("fixed_position");
      });
});