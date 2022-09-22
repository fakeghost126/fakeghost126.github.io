const productoDOM = documento. querySelector(".productos__center")
const carritoDOM = documento. querySelector(".carrito")
const carritoCenter = documento. querySelector(".carrito__center")
const openCarrito = documento. querySelector(".carrito__icon")
const closeCarrito = documento. querySelector(".close__carrito")
const overlay = documento. querySelector(".carrito__overlay")
const carritoTotal = documento. querySelector(".carrito__total")
const clearCarritoBtn = documento. querySelector(".clear__carrito")
const itemTotales =document. querySelector(".item__total")
const detalles = documento. getElementById('detalles')

dejar carrito = [];
let buttonDOM = [];

interfaz de usuario de clase {

	detalleProducto(id){
		const filtroDato = productos. filter(item = > elemento. id == id)
		dejar resultado = ""
		filtroDato. forEach(producto => {
			resultado += `
 <artículo clase="detalle-cuadrícula">
 <img src=${producto. imagen} alt="${producto. title}" class="img-fluid">
				<div class="detalles-content">
 <h3>${producto. título}</h3>
					<div class="rating">
 <spano>
							<i class="bx bxs-star"></i>
						</span>
 <spano>
							<i class="bx bxs-star"></i>
						</span>
 <spano>
							<i class="bx bxs-star"></i>
						</span>
 <spano>
							<i class="bx bxs-star"></i>
						</span>
 <spano>
							<i class="bx bx-star"></i>
						</span>
					</div>
 <p class="price"><b>Precio: </b> $${producto. precio}</p>
						<p class="description">
							<b>Descripcion: </b> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quae ad ex sint expedita perspiciatis odit eligendi! Et quia ex aperiam dolorum sunt omnis maiores. Repudiandae delectus iste exercitationem vel?</span>
						</p>
						<p class="description">
							<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptates consequuntur in assumenda odit hic, aut cupiditate dolorem aspernatur! Quibusdam iusto magnam vero maxime quisquam voluptatibus minima aliquam molestias, iure ratione commodi, reiciendis quasi.</span>
						</p>
						<div class="bottom">
							<div class="btn__group">
 <button class="btn addToCart" data-id=${producto. id}>Añadir carrito</button>
							</div>
						</div>
				</div>
 </artículo>
			`
		});
		detalles. innerHTML = resultado;
	}

	renderProductos(productos){
		dejar resultado = ""
		productos. forEach((producto) =>{
			resultado += `
			<div class="producto">
			<div class="image__container">
 <img src=${producto. imagen} alt="">
		</div>
          <div class="producto__footer">
 <h1>${producto. título}</h1>
            <div class="rating">
 <spano>
                <i class="bx bxs-star"></i>
              </span>
 <spano>
                <i class="bx bxs-star"></i>
              </span>
 <spano>
                <i class="bx bxs-star"></i>
              </span>
 <spano>
                <i class="bx bxs-star"></i>
              </span>
 <spano>
                <i class="bx bx-star"></i>
              </span>
            </div>
 <div class="price">$${producto. precio}</div>
          </div>
          <div class="bottom">
            <div class="btn__group">
 <button class="btn addToCart" data-id=${producto. id}>Añadir carrito</button>
 <a href="producto-detalles.html?id=${producto. id}" class="btn view">Vista</a>
            </div>
          </div>
        </div>
				`
		});
		productoDOM. innerHTML = resultado
	}

	getButtons(){
		const botones = [... documento. querySelectorAll(".addToCart")];
		buttonDOM = botones;
		botones. forEach((botón)=> {
			const id = botón. conjunto de datos. identificación;
			const inCart = carrito. find(item = > elemento. id === parseInt(id, 10));

			if(inCart){
				botón. innerHTML = "En el carrito";
				botón. deshabilitado = verdadero;
			}
			botón. addEventListener("click", e =>{
				e. preventDefault();
				e. objetivo. innerHTML = "En el carrito";
				e. objetivo. deshabilitado = verdadero;
				

				GET productos al carrito
				const carritoItem = {... Almacenamiento. getProductos(id), cantidad: 1}

				agregamos el producto al carrito
				carrito = [... carrito, carritoItem]

				Guardamos el carrito al localstorage
				Almacenamiento. saveCart(carrito)

				Establecer valores de carrito
				esto. setItemValues(carrito)
				esto. addCarritoItem(carritoItem)
				Mostrar al carrito
			})
		})
	}

	setItemValues(carrito){
		let tempTotal = 0;
		let itemTotal = 0;
		carrito. mapa(elemento => {
			tempTotal += elemento. precio * artículo. cantidad;
			itemTotal += item. cantidad;
		});
		carritoTotal. innerText = parseFloat(tempTotal. toFixed(2));
		itemTotales. innerText = itemTotal
	}

	addCarritoItem({imagen, precio, título, id}){
		const div = documento. createElement("div")
		div. classList. add("carrito__item")

		div. innerHTML = `
		<img src=${image} alt=${title}>
		<div>
 <h3>${título}</h3>
			<p class="price">$${price}</p>
		</div>
		<div>
			<span class="increase" data-id=${id}>
				<i class="bx bxs-up-arrow"></i>
			</span>
			<p class="item__cantidad">1</p>
			<span class="decrease" data-id=${id}>
				<i class="bx bxs-down-arrow"></i>
			</span>
		</div>
		<div>
			<span class="remove__item" data-id=${id}>
				<i class="bx bx-trash"></i>
			</span>
		</div>
		`
		carritoCenter. appendChild(div)
	}
	mostrar(){
		carritoDOM. classList. add("mostrar")
		superposición. classList. add("mostrar")
	}
	esconder(){
		carritoDOM. classList. remove("mostrar")
		superposición. classList. remove("mostrar")
	}
	setAPP(){
		carrito = Almacenamiento. getCart()
		esto. setItemValues(carrito)
		esto. populate(carrito)
		openCarrito. addEventListener("click",, esto. mostrar)
		cerrarCarrito. addEventListener("click",, esto. esconder)
	}
	populate(carrito){
		carrito. forEach(item => esto. addCarritoItem(elemento))
	}
	cartLogic(){
		clearCarritoBtn. addEventListener("clic", () =>{
			esto. clearCarrito()
			this.hide()
		});

		carritoCenter.addEventListener("click", e =>{
			const target = e.target.closest("span")
			const targetElement = target.classList.contains("remove__item");
			console.log(target)
			console.log(targetElement)
			if(!target) return
			if(targetElement){
				const id = parseInt(target.dataset.id);
				this.removeItem(id)
				carritoCenter.removeChild(target.parentElement.parentElement)
			}else if(target.classList.contains("increase")){
				const id = parseInt(target.dataset.id, 10);
				let tempItem = carrito.find(item => item.id === id);
				tempItem.cantidad++;
				Storage.saveCart(carrito)
				this.setItemValues(carrito)
				target.nextElementSibling.innerText = tempItem.cantidad
			}else if(target.classList.contains("decrease")){
				const id = parseInt(target.dataset.id, 10);
				let tempItem = carrito.find(item => item.id === id);
				tempItem.cantidad--;

				if(tempItem.cantidad > 0){
					Storage.saveCart(carrito);
					this.setItemValues(carrito);
					target.previousElementSibling.innerText = tempItem.cantidad;
				}else{
					this.removeItem(id);
					carritoCenter.removeChild(target.parentElement.parentElement)
				}
			}
		});
	}
	clearCarrito(){
		const cartItems = carrito. map(item = > elemento. identificación)
		cartItems. forEach(id => esto. removeItem(id))

		while(carritoCenter. niños. longitud > 0){
			carritoCenter. removeChild(carritoCenter. niños[0])
		}
	}
	removeItem(id){
		carrito = carrito. filter(item = > elemento. id !== id);
		esto. setItemValues(carrito)
		Almacenamiento. saveCart(carrito)
		let button = esto. singleButton(id);
		if(botón){
			botón. deshabilitado = falso;
			botón. innerText = "Añadir carrito"
		}
	}
	singleButton(id){
		botón de retornoDOM. find(button => parseInt(button. conjunto de datos. id) === id)
	}
}



clase Almacenamiento {
	 static saveProduct(obj){
		localStorage. setItem("productos", JSON. stringify(obj))
	}
	static saveCart(carrito){
		localStorage. setItem("carrito", JSON. stringify(carrito))
	}
	static getProductos(id){
		const producto = JSON. parse(localStorage. getItem("productos"))
		devolver producto. find(product =>product. id === parseFloat(id, 10))
	}
	getCart estático(){
		return localStorage. getItem("carrito") ? JSON. parse(localStorage. getItem("carrito")) : [];
	}
}

clase Productos {
  async getProductos() {
    probar {
			const result = await fetch("productos.json")
			const data = espera el resultado. json()
			const productos = datos. Artículos
			productos de devolución 
		}catch(err){
			consola. log(err)
		}
  }
}

dejar categoría = "";
dejar productos  = [];

categoría de funciónValor(){
	const ui = nueva interfaz de usuario();

	categoría = documento. getElementById("categoría"). valor
	if(categoría. longitud > 0){
		const producto = productos. filter(regx = > regx. categoría === categoría)
		ui. renderProductos(producto)
		ui. getButtons();
	}más{
		ui. renderProductos(productos)
		ui. getButtons();
	
	}
}

const query = new URLSearchParams(window. ubicación. buscar)
let id = consulta. get('id')

documento. addEventListener("DOMContentLoaded",, asincrónico () =>{
	const productosLista = nuevos Productos();
	const ui = nueva interfaz de usuario();

	ui. setAPP()

	productos = espera productosLista. getProductos()
	if(id){
		ui. detalleProducto(id)
		Almacenamiento. saveProduct(productos)
		ui. getButtons();
		ui. cartLogic();
	}más{
		ui. renderProductos(productos)
		Almacenamiento. saveProduct(productos)
		ui. getButtons();
		ui. cartLogic();
	}
})
