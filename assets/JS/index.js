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
};



// ----------------------------

const init = () => {
    rendProd();
    categories.addEventListener("click", filterActive);
    burger.addEventListener("click", toggleMenu);
};

init();