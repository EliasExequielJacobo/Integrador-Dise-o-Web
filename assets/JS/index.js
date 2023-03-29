const products = document.querySelector(".product__container");

const categories = document.querySelector(".categories");

const categoryButtons = document.querySelectorAll(".category");

const modalMsg = document.querySelector(".modal-msg");

const burger = document.querySelector(".header__navbar--hamburger");

const barsMenu = document.querySelector(".header__navbar__navbar-list");

const userAcces = document.querySelector(".header--access");

const signIn = document.querySelector(".header__navbar__login");

const cart = document.querySelector(".cartLabel");

const contenCarrito = document.querySelector(".carrito");

const prodContainer = document.querySelector(".prodContainer");

const totalPrice = document.querySelector(".total");

const comprarProd = document.querySelector(".btnComprar");

const borrarProd = document.querySelector(".btnBorrar");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const saveLocalStorage = (buyList) => {
	localStorage.setItem("carrito", JSON.stringify(buyList));
};

//Render productos//

const renderProducts = (producto) => {

    const { id, name, brand, subTitle, bid, img } = producto;

	return `<div class="product__container__card">

                     
    <img src="${img}" alt="${name}" class="merch--imgsep">
    

    <div class="product__container__card__info">
        <div class="product__container__card__info__top">
            <h3>${name}</h3>
            <p>${brand}</p>
        </div>

        <div class="product__container__card__info__mid">
            <p>${subTitle}</p>
        </div>

        <div class="product__container__card__info__bot">
            
            <div class="product__container__card__info__bot__price">
            <p>$ ${bid}</p>
            </div>

            
            <button class="product__container__card__info__bot--btnadd" data-id="${id}" data-name="${name}" data-img="${img}" data-precio="${bid}">Comprar</button>
            

        </div>
    </div>


</div>`;
};


const renderMercanciaTodo = (index = 0) => {
    products.innerHTML += productsData.map(renderProducts).join("");
  };
//------------------------//

//Categorias//

    const prodFiltrados = (category) => {
        const merchList = productsData.filter((product) => product.category === category);
    
        products.innerHTML = merchList.map(renderProducts).join("");
    };

    const rendProd = (index = 0, category = undefined) => {
     if (!category) {
         renderMercanciaTodo();
       return;
     }
     prodFiltrados(category);
   };
  
   const btnOn = (categoriaSelec) => {
    const categories = [...categoryButtons];
    categories.forEach((button) => {
      if (button.dataset.category !== categoriaSelec) {
        button.classList.remove("act");
        return;
      }
      button.classList.add("act");
    });
  };
  
  const swapFilter = (e) => {
    const categoriaSelec = e.target.dataset.category;
    btnOn(categoriaSelec);
    
};
  
  const filterActive = (e) => {
    if (!e.target.classList.contains("category")) return;
    swapFilter(e);
    if (!e.target.dataset.category) {
      products.innerHTML = "";
      rendProd();
    } else {
      rendProd(0, e.target.dataset.category);
    }
  };


//--------------------//

// Menu hamburgesa, user access y carrito toggle

const toggleMenu = () => {
    barsMenu.classList.toggle("openMenu");
    if (signIn.classList.contains("openMenu")){
      signIn.classList.remove("openMenu");
      return;
    }

    if (contenCarrito.classList.contains("openCart")){
      contenCarrito.classList.remove("openCart")
      return;
    }

};


const toggleSignIn = () =>{
  signIn.classList.toggle("openMenu");
  if (barsMenu.classList.contains("openMenu")){
    barsMenu.classList.remove("openMenu");
    return;
  }

  if (contenCarrito.classList.contains("openCart")){
    contenCarrito.classList.remove("openCart")
    return;
  }
};



const toggleCart = () => {
  contenCarrito.classList.toggle ("openCart");
  if (barsMenu.classList.contains("openMenu")){
    barsMenu.classList.remove("openMenu");
    return;
  }

  if (signIn.classList.contains("openMenu")){
    signIn.classList.remove("openMenu");
    return;
  }
};

const cerrar = (e) => {
  if(!e.target.classList.contains("navbar-link")){
    return;
  }

  barsMenu.classList.remove("openMenu")
};


const scrollClose  = () => {
  if (!barsMenu.classList.contains("openMenu") && !contenCarrito.classList.contains("openCart") && !signIn.classList.contains("openMenu")) {
    return;
  }

  barsMenu.classList.remove("openMenu");
  contenCarrito.classList.remove("openCart");
  signIn.classList.remove("openMenu");
};

// ----------------------------

//CARRITO--------------------

const renderMerchCard = (cartProduct) => {
  const { id, name, bid, img, quantity } = cartProduct;
  return  `
  <div class="productCard">
          <img src="${img}" />
          <div class="productInfo">
            <h3 class="productName">${name}</h3>
            <span class="productPrice">$ ${bid} </span>
          </div>
          <div class="productCuantity">
            <span class="Number resta" data-id="${id}">-</span>
            <span class="Number">${quantity}</span>
            <span class="Number suma" data-id="${id}">+</span>
          </div>
        </div>
  `;
}; 

const renderCarrito = () => {
  if (!carrito.length) {
    prodContainer.innerHTML = ` <p class="msgVacio">El carrito no contiene productos.</p>`;
    return;
  }

  prodContainer.innerHTML = carrito.map(renderMerchCard).join("");
};

const getCartTotal = () => {
  return carrito.reduce ((acc, cur) => {
    return acc + Number(cur.bid) * cur.quantity;
  }, 0);
};

const showTotal = () => {
  totalPrice.innerHTML = `<div class="total">
  <p>Subtotal:</p>
  <span> $${getCartTotal()}</span>
</div>`;
};

const disBtn = (btn) => {
  if (!carrito.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

const checkCart = () => {
  saveLocalStorage(carrito);
  renderCarrito();
  showTotal();
  disBtn(comprarProd);
  disBtn(borrarProd);
};

const agregarProd = (e) => {
    if (!e.target.classList.contains("product__container__card__info__bot--btnadd")) {
        return;
    };

    const {id, name, img, bid} = e.target.dataset; 
    
    const product = productData(id, name, img, bid);

    if (existeUnProductoEnCarrito(product)) {
      agregardUnidadAlCarrito(product);
      showSuccessModal("Se ha añadido una unidad al carrito");
    } else {
      crearProductoCarrito(product);
      showSuccessModal("Un nuevo producto se añadio al carrito");
    }

    checkCart();
};

const productData = (id, name, img, bid) => {
  return {id, name, img, bid};
};

const existeUnProductoEnCarrito = (product) =>{
  return carrito.find((item) => {
    return item.id === product.id
  })
};

const agregardUnidadAlCarrito = (product) =>{
  carrito = carrito.map ((cartProduct) =>{
    return cartProduct.id === product.id ? {... cartProduct, quantity: cartProduct.quantity + 1}
    : cartProduct;
  })
};

const showSuccessModal = (msg) =>{
  modalMsg.classList.add("modalActiv");
  modalMsg.textContent = msg;

  setTimeout (() =>{
    modalMsg.classList.remove("modalActiv");
  }, 1000);
};

const crearProductoCarrito = (product) => {
  carrito = [...carrito, {
    ...product, quantity: 1,
  },];
};



//---------------------------


const init = () => {
    rendProd();
    categories.addEventListener("click", filterActive);
    burger.addEventListener("click", toggleMenu);
    userAcces.addEventListener("click", toggleSignIn);
    cart.addEventListener("click", toggleCart);
    barsMenu.addEventListener("click", cerrar);
    window.addEventListener("scroll", scrollClose);
    document.addEventListener("DOMContentLoaded", renderCarrito);
    document.addEventListener("DOMContentLoaded", showTotal);
    products.addEventListener("click", agregarProd);
    disBtn(comprarProd);
    disBtn(borrarProd);
};

init();