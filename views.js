export class Views {
    mainView() {
        $("body").html(`
        <div class="container">
        ${this.writeHeader()}
        <section id="christmas">
            <img src="./media/christmas.jpg" alt="Christmas">
        </section>
        <section id="banner">
            <div class="banner--img">
                <img src="./media/banner.jpg" alt="Banner">
            </div>
            <div class="banner--text">
                <h1>¡Bienvenido a EzClothes!</h1>
                <p>En EzClothes encontrarás todo lo que necesitas para vestirte de la mejor manera. 
                    Tenemos una gran variedad de productos para que puedas elegir lo que más te guste.</p>
                <button id="seeAllProductsButton">Ver todo</button>
            </div>
        </section>
        <section id="carrousel">
            <img src="./media/carrousel/couple.jpg" id="carrousel-img" alt="Imagen Carrousel">
        </section>
        <section id="follow_us">
           <img src="./media/follow_us_1.jpg" alt="Follow Us First Image" id="FU1" class="FU">
           <img src="./media/follow_us_2.jpg" alt="Follow Us First Image" id="FU2" class="FU">
           <img src="./media/follow_us_3.jpg" alt="Follow Us First Image" id="FU3" class="FU">
            <div class="follow-us--text">
                <h1>¡Síguenos!</h1>
                <p>Te esperamos en nuestras redes sociales.
                    Aquí sucede todo. No te lo pierdas.</p>
                <div class="social-media">
                    <a href="https://www.instagram.com/ezclothes/" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.facebook.com/ezclothes" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/ezclothes" target="_blank"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </section>
        <section id="news">
            <div class="news--text">
                <h1>¡Suscríbete a nuestro newsletter!</h1>
                <p>Recibe las últimas novedades y ofertas de EzClothes.</p>
                <form class="NL_form">
                    <input type="email" name="NL_mail" placeholder="Introduce tu email" required>
                    <p id="NL--message">¡Consulte su correo!</p>
                    <button type="submit">Suscribirse</button>
                </form>
            </div>
        </section>
        ${this.writeFooter()}`);
    }

    productsView(products, type="all") {
        var realType = type;
        switch (type) {
            case "all":
                type = "Todos los productos";
                break;
            case "woman":
                type = "Mujer";
                break;
            case "men":
                type = "Hombre";
                break;
            case "jewelery":
                type = "Joyería";
                break;
            case "electronics":
                type = "Accesorios";
                break;
        }
        
        $("body").html(`
        <div class="container">
        ${this.writeHeader()}
        <section id="products">
        <input id="categoryForSort" type="hidden" value="${realType}">
            <div class="products--text">
                <h1>${type}</h1>
            </div>
            <div class="sortProducts">
            <p>Ordenar por: </p>
                <select name="sort" id="sort">
                    <option value="">Selecciona una opción</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <button class="sort--button">Ordenar</button>
            </div>
            <div class="products--container">
            </div>
        </section>
        ${this.writeFooter()}`);

        products.forEach((product) => {
            $(".products--container").append(`
            <article class="product">
                <input id="product--id--all-products" type="hidden" value="${product.id}">
                <img class="product--img" src="${product.image}" alt="${product.title}">
                <h3 class="product--title" >${product.title}</h3>
                <span>${product.category}</span>
                <div class="rating">
                        <i data-star="${product.rating.rate}"></i>
                        <p>(${product.rating.count})</p>
                </div>
                <p class="price">${product.price}€</p>
            </article>
            `);
        });
    }

    singleProductView(product) {
        if(product.category == "men's clothing" || product.category == "women's clothing") {
            $("body").html(`
            <div class="container">
            ${this.writeHeader()}
            <section id="single--product">
                <img src="${product.image}" alt="${product.title}">
                <div class="product--info">
                    <input id="product--id--single-product" type="hidden" value="${product.id}">
                    <h1>${product.title}</h1>
                    <span>${product.category}</span>
                    <div class="rating">
                        <i data-star="${product.rating.rate}"></i>
                        <p>(${product.rating.count})</p>
                    </div>
                    <p class="price">${product.price}€</p>
                    <p>${product.description}</p>
                    <div class="tallas">
                        <label for="product--size">Talla</label>
                        <select name="size" class="size">
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <button class="add-to-cart">Añadir al carrito</button>
                </div>
            </section>
            ${this.writeFooter()}`);
        } else {
            $("body").html(`
            <div class="container">
            ${this.writeHeader()}
            <section id="single--product">
                <img src="${product.image}" alt="${product.title}">
                <div class="product--info">
                    <input id="product--id--single-product" type="hidden" value="${product.id}">
                    <h1>${product.title}</h1>
                    <span>${product.category}</span>
                    <p>${product.rating.count} opiniones</p>
                    <p class="price">${product.price}€</p>
                    <p>${product.description}</p>
                    <button class="add-to-cart">Añadir al carrito</button>
                </div>
            </section>
            ${this.writeFooter()}`);
        }
        
    }

    cartView(cart) {
        var subtotal = 0;
        var envio = 1.20;
        var total = 0;
        $("body").html(`
        <div class="container">
        ${this.writeHeader()}
        <section id="cart">
            <div class="cart--container">
                <h1>Carrito</h1>
                <div class="cart--products">
                    <ul class="cart--list">

                    </ul>
                </div>
                <div class="cart--total">
                    <h2 id="subtotal--text">Subtotal</h2>
                    <p id="subtotal--price"></p>
                    <h2 id="shipping--text">Envío</h2>
                    <p id="shipping--price">1.20€</p>
                    <h2 id="total--text">Total</h2>
                    <p id="total--price"></p>
                    <button class="buy">Comprar</button>
                </div>
        </div>
        `);

        cart.forEach((product) => {
            subtotal += product.price * product.quantity;
            if(product.category == "men's clothing" || product.category == "women's clothing") {
                $(".cart--list").append(`
                    <li>
                        <input id="product--id--cart" type="hidden" value="${product.id}">
                        <img src="${product.image}" alt="${product.title}">
                        <h3 id="cart--title--link">${product.title}</h3>
                        <p class="price">${product.price}€</p>
                        <p>${product.size}</p>
                        <input id="product--quantity" type="number" min="1" value="${product.quantity}">
                        <div class="actions">
                            <i class="fa-solid fa-arrows-rotate"></i>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </li>
                `);
            } else {
                $(".cart--list").append(`
                    <li>
                        <input id="product--id--cart" type="hidden" value="${product.id}">
                        <img src="${product.image}" alt="${product.title}">
                        <h3 id="cart--title--link">${product.title}</h3>
                        <p class="price">${product.price}€</p>
                        <input id="product--quantity" type="number" min="1" value="${product.quantity}">
                        <div class="actions">
                            <i class="fa-solid fa-arrows-rotate"></i>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </li>
                `);
            }
        })
        
        $("#subtotal--price").html(`${subtotal.toFixed(2)}€`);
        total = subtotal + envio;
        $("#total--price").html(`${total.toFixed(2)}€`);
    }

    logInView() {
        $("body").html(`
        <div class="container">
        ${this.writeHeader()}
        <section id="login_signup">
            <div class="login--container">
                <h1>Soy Cliente/a</h1>
                <form class="LI_form">
                    <input id="LI_username" name="LI_username" type="text" placeholder="Nombre de usuario" required>
                    <input id="LI_psw" name="LI_psw" type="password" placeholder="Contraseña" required>
                    <a>¿Has olvidado tu contraseña?</a>
                    <a id="activate_SU">¿No tienes cuenta? ¡Regístrate!</a>
                    <p id="login--message">Sesión iniciada</p>
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
            <div class="signup--container">
                <h1>¿No tienes cuenta?</h1>
                <p>Regístrate y disfruta de todas las ventajas de ser cliente de EzClothes</p>
                <form class="SU_form">
                    <input id="SU_username" name="SU_username" type="text" placeholder="Nombre de usuario" disabled required>
                    <input id="SU_name" name="SU_name" type="text" placeholder="Nombre" disabled required>
                    <input id="SU_surname" name="SU_surname" type="text" placeholder="Apellidos" disabled required>
                    <input id="SU_phone" name="SU_phone" type="tel" placeholder="Teléfono (123-456-789)" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" disabled required>
                    <input id="SU_mail" name="SU_mail" type="email" placeholder="tucorreo@dominio.com" disabled required>
                    <input id="SU_psw" name="SU_psw" type="password" placeholder="Contraseña" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" title="UpperCase, LowerCase, Number/SpecialChar and min 8 Chars" disabled required>
                    <a id="activate_LI">¿Ya tienes cuenta? ¡Inicia sesión!</a>
                    <p id="signup--message">¡Registro realizado con éxito! Para activar su cuenta, confirme su correo</p>
                    <button type="submit" disabled>Crear cuenta</button>
                </form>
        </section>
        </div>`);
    }

    checkoutView() {
        $("body").html(`
        <div class="container">
        ${this.writeHeader()}
        <section id="checkout--payment">
            <h1>Checkout - Datos de envío y pago</h1>
            <div class="checkout--container">
                <div class="checkout--form">
                    <form class="checkout--form--container">
                        <div class="shipment">
                        <h3>Envío</h3>
                            <input id="checkout--name" name="checkout--name" type="text" placeholder="Nombre" required>
                            <input id="checkout--surname" name="checkout--surname" type="text" placeholder="Apellidos" required>
                            <input id="checkout--phone" name="checkout--phone" type="tel" placeholder="Teléfono (123-456-789)" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required>
                            <input id="checkout--mail" name="checkout--mail" type="email" placeholder="correo@dominio.com" required>
                            <input id="checkout--address" name="checkout--address" type="text" placeholder="Dirección" required>
                            <input id="checkout--city" name="checkout--city" type="text" placeholder="Ciudad" required>
                            <input id="checkout--postal" name="checkout--postal" type="text" placeholder="Código postal" required>
                            <input id="checkout--country" name="checkout--country" type="text" placeholder="País" required>
                        </div>
                        <div class="payment">
                        <h3>Pago</h3>
                            <input id="payment--titular" name="payment--titular" type="text" placeholder="Titular" required>
                            <input id="payment--number" name="payment--number" type="text" placeholder="Número de tarjeta" maxlength="16" pattern="^[0-9]{16}$" required>
                            <div>
                                <select name="month" id="months">
                                    <option hidden selected value="MM">Mes</option>
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                    <option value="4">04</option>
                                    <option value="5">05</option>
                                    <option value="6">06</option>
                                    <option value="7">07</option>
                                    <option value="8">08</option>
                                    <option value="9">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select name="year" id="years">
                                    <option hidden selected value="YY">Año</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                </select>
                            </div>
                            <input id="payment--cvv" name="payment--cvv" type="text" placeholder="CVV" maxlength="3" required>
                            <p id="buy--message">¡Compra confirmada! Consulte su correo</p>
                            <button class="payment" type="submit">Pagar</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </div>`);
    }

    writeHeader() {
        return `
        <header>
            <a class="logo">
                <img src="./media/logo.png" alt="EzClothes Logo">
            </a>
            <nav>
                <!-- Div para el menu hamburguesa -->
                <div class="checkbtn">
                    <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div> 
                </div>
                <ul class="menu">
                    <li><a id="productsLink">Productos</a></li>
                    <li><a id="woman">Mujer</a></li>
                    <li><a id="men">Hombre</a></li>
                    <li><a id="jewelery">Joyería</a></li>
                    <li><a id="accesories">Accesorios</a></li>
                </ul>
            </nav>
            <div class="login_cart">
                <i class="fas fa-user"></i>
                <i class="fas fa-shopping-cart"></i>
            </div>
        </header>`;
    }

    writeFooter() {
        return `
        <footer>
        <div class="help">
            <h2>Ayuda</h2>
            <ul>
                <li><a href="#">Contacto</a></li>
                <li><a href="#">Envíos</a></li>
                <li><a href="#">Devoluciones</a></li>
                <li><a href="#">Preguntas frecuentes</a></li>
            </ul>
        </div>
        <div class="about_us">
            <h2>Sobre nosotros</h2>
            <ul>
                <li><a href="#">Quiénes somos</a></li>
                <li><a href="#">Trabaja con nosotros</a></li>
                <li><a href="#">Política de privacidad</a></li>
                <li><a href="#">Términos y condiciones</a></li>
            </ul>
        </div>
        <div class="legal">
            <h2>Legal</h2>
            <ul>
                <li><a href="#">Política de cookies</a></li>
                <li><a href="#">Política de privacidad</a></li>
                <li><a href="#">Términos y condiciones</a></li>
            </ul>
        </div>
        <div class="payment_methods">
            <h2>Métodos de pago</h2>
            <ul>
                <li><a href="#"><i class="fab fa-cc-visa"></i></a></li>
                <li><a href="#"><i class="fab fa-cc-mastercard"></i></a></li>
                <li><a href="#"><i class="fab fa-cc-paypal"></i></a></li>
                <li><a href="#"><i class="fab fa-cc-amazon-pay"></i></a></li>
            </ul>
        </div>
        <div class="social_media_footer">
            <h2>Síguenos</h2>
            <ul>
                <li><a href="https://www.instagram.com/ezclothes/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                <li><a href="https://www.facebook.com/ezclothes" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                <li><a href="https://twitter.com/ezclothes" target="_blank"><i class="fab fa-twitter"></i></a></li>
            </ul>
        </div>
    </footer>
    </div>`;
    }
}