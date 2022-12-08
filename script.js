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

    // El delegate sirve para que sea dinamico, ya que si no se le pone el delegate, no se podria hacer click en los botones 
    // de las categorias porque no existen al cargar la pagina

    // Es document.delegate junto el selector y el evento que se quiere que se ejecute



    // Eventos que llevan a la vista principal

    $(document).delegate(".logo", "click", function() {
        controllers.changeToMainView(views);
    });



    // Eventos que llevan a la vista de todos los productos

    $(document).delegate("#carrousel-img", "click", function() {
        controllers.changeToAllProductsView(views);
    });

    $(document).delegate("#christmas img", "click", function() {
        controllers.changeToAllProductsView(views);
    });
    
    $(document).delegate("#productsLink", "click", function() {
        controllers.changeToAllProductsView(views);
    });

    $(document).delegate("#seeAllProductsButton", "click", function() {
        controllers.changeToAllProductsView(views);
    });



    // Eventos que controlan el carrousel

    $(document).delegate(".carrousel--btn-left", "click", function() {
        controllers.changeImageCarrousel(images, "left");
    });
    
    $(document).delegate(".carrousel--btn-right", "click", function() {
        controllers.changeImageCarrousel(images, "right");
    });
    


    // Eventos que llevan a la vista de productos por categoria
    
    $(document).delegate("#woman", "click", function() {
        controllers.changeViewsBetweenCategories("woman",views);
    });
    
    $(document).delegate("#men", "click", function() {
        controllers.changeViewsBetweenCategories("men", views);
    });
    
    $(document).delegate("#jewelery", "click", function() {
        controllers.changeViewsBetweenCategories("jewelery", views);
    });
    
    $(document).delegate("#accesories", "click", function() {
        controllers.changeViewsBetweenCategories("electronics", views);
    });
    


    // Cambiar el orden de los productos al pulsar el boton de ordenar

    $(document).delegate(".sort--button", "click", function() {
        var order = $("#sort").val();
        var category = $("#categoryForSort").val();
        controllers.sortProducts(order, category ,views);
    });
    


    // Evento que llevan a la vista de login y lo manejan, junto a los eventos de correo

    $(document).delegate(".fa-user", "click", function() {
        controllers.changeToLogIn(views);
    });

    $(document).delegate(".LI_form", "submit", function(e) {
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

    $(document).delegate(".SU_form", "submit", function(e) {
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

    $(document).delegate(".NL_form", "submit", function(e) {
        e.preventDefault();
        controllers.newsLetterSuscription();

        emailjs.sendForm('service_ysn82m8', 'template_x1zagzk', '.NL_form')
    });



    // Evento que llevan a la vista de producto

    $(document).delegate(".product--img", "click", function() {
        var ID = $(this).siblings("#product--id--all-products").val();
        controllers.changeToProductView(views, ID);
    });

    $(document).delegate(".product--title", "click", function() {
        var ID = $(this).siblings("#product--id--all-products").val();
        controllers.changeToProductView(views, ID);
    });

    $(document).delegate("#cart--title--link", "click", function() {
        var ID = $(this).siblings("#product--id--cart").val();
        controllers.changeToProductView(views, ID);
    });



    // Eventos que llevan a la vista de carrito y lo manejan

    $(document).delegate(".add-to-cart", "click", function() {
        var ID = $(this).siblings("#product--id--single-product").val();
        var size = $(this).siblings(".tallas").children(".size").val();

        fetch(`https://fakestoreapi.com/products/${ID}`)
            .then(res=>res.json())
            .then(json=>controllers.addProductToCart(json, size, cart));

        $(this).animate({"background-color": "green"}, 500);
        $(this).text("Added to cart");
        $(this).effect("bounce", {times: 2}, 1000);
    });

    $(document).delegate(".fa-shopping-cart", "click", function() {
        controllers.changeToShoppingCart(views, cart);
    });

    $(document).delegate(".remove-from-cart", "click", function() {
        var ID = $(this).siblings("#product--id--cart").val();
        $(this).parent().fadeOut(500, function() {
            controllers.removeProductFromCart(ID, cart);
            controllers.changeToShoppingCart(views, cart);
        });
    });

    $(document).delegate(".update-from-cart", "click", function() {
        var ID = $(this).siblings("#product--id--cart").val();
        var quantity = $(this).siblings("#product--quantity").val();
        controllers.updateProductQuantity(ID, quantity, cart);
        controllers.changeToShoppingCart(views, cart);
    });

    $(document).delegate(".buy", "click", function() {
        $("#buy--message").show(200);
    });

    // Evento para el menu hamburguesa

    $(document).delegate(".hamburger-lines", "click", function() {
        $(".checkbtn").toggleClass("open");
        $("body").toggleClass("fixed_position");
      });
    
      // Cerrar menu al pulsar enlace
    $(document).delegate(".menu a", "click", function() {
        $(".checkbtn").removeClass("open");
        $("body").removeClass("fixed_position");
      });
});