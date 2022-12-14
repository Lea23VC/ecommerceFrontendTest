![Vercel](https://vercelbadge.vercel.app/api/Lea23VC/ecommerceBackendTest) <a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20馃槣%20馃槏-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a> 

# Proyecto: Ecommerce Test Frontend

Este frontend fue desarrollado solo utilizando javascript, y consumiento las API del backend que se realiz贸 en paralelo.

<b>Link repositorio del backend:</b>
https://github.com/Lea23VC/ecommerceBackendTest

<b>Link deploy frontend en Vercel:</b>
https://ecommerce-frontend-test.vercel.app

<b>PDF con documentaci贸n: </b>
El contenido de la documentaci贸n (el mismo de este readme) tambien puede encontrarlo [aqu铆](/documentation.pdf)

## Recursos utilizados

- Tailwind
- Bootstrap (para formulario de busqueda y dropdown)
- FontAwesome
- Font Poppins de Google Fonts
- Tienda de referencia: https://themes.shopify.com/themes/fresh/styles/sweet/preview


## Estilos

En este proyecto no se hizo uso directo de un archivo CSS de estilos o estilo "inline", sino que se utiliz贸 en su totalidad Tailwind.


## Uso de la tienda 

Esta es la pagina principal, la barra verde arriba es solo estetico, al igual que todos los links en la barra de navegaci贸n, a excepci贸n de las categor铆as.

![](/documentation/images/main_page.png)


### Filtrar por categor铆a

Para filtrar los productos por categar铆a, se pueded realizar de dos formas:



- Hover en la secci贸n de Tienda en la barra de navegaci贸n. As铆 apareceran las categor铆as disponible, incluyendo "Todo", el cual elimina los filtros de la busqueda.
![](/documentation/images/hover_tienda.png)


- A trav茅s del panel izquierdo al lado de los productos.
![](documentation/images/categorias.png)

La categor铆a actual quedar谩 marcado en negrita y color rosa. Al usar un filtro de categor铆a, la paginaci贸n vuelve a 1.

![](/documentation/images/categoria_bebidas.png)

### Busqueda por nombre

Para realizar una busqueda por nombre, se utiliza el "formulario" en el panel izquierdo de los productos, haciendo click en el icono de lupa o presionando Enter.

Este realiza una busqueda utilizando las palabras ingresadas y son mostrados los productos. 

![](/documentation/images/search_coca.png)

Para eliminar la busqueda actual, se hace click a la "X" del formulario, al lado del icono de busqueda.

![](documentation/images/clear_search.png)

Al realizar una busqueda por nombre, se mantienen los filtros actuales utilizados, a excepci贸n de la paginaci贸n.


### Orden de productos

Se pueden ordenar los productos actuales, por nombre, precio y descuento, de forma descendiente o ascendiente, a trav茅s del dropdown en el panel izquierdo al lado de los productos. Tambien esta la opci贸n de "Sin orden" para limpiar este filtro.

![](documentation/images/dropdown.png)

Al cambiar el orden de productos, se mantienen los filtros actuales utiizados, a excepci贸n de la paginaci贸n.



### Paginaci贸n

Por defecto, la cantidad por pagina de productos es de 6. Para cargar mas, se hace uso de la paginaci贸n que esta abajo del grid de productos. Al hacer uso de este, se puede navegar entre las paginas de productos actuales.

![](documentation/images/pagination.png)

Al hacer uso de la paginaci贸n, se mantienen todos los filtros actuales de la busqueda.


### Responsive

La pagina es totalmente responsiva y funcional, cambiando la cantidad de productos por fila seg煤n la pantalla, y otros detalles.

![](documentation/images/Screen%20Shot%202022-10-16%20at%2023.36.39.png)

![](documentation/images/Screen%20Shot%202022-10-16%20at%2023.36.48.png)

![](documentation/images/Screen%20Shot%202022-10-16%20at%2023.36.52.png)

鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦? 鈦?

## Javascript y consumo de API

El archivo js principal del proyecto se encarga de renderizar en un determinado div, el contenido, en este caso, los productos y las categorias. Esto realizando busqueda de elementos por ID o clase, tomando sus valores y haciendo uso de estos, ante de la dificultad de no usar un entorno como Node. 

El consumo de API se realiza en diferentes archivos, donde los parametros de busqueda de los productos son recibidos a trav茅s del archivo js principal. 

Los archivos principales son:

- src/api/categories.js: Retorna las categorias haciendo consumo de la API.
- src/api/products.js: Retorna los productos, pudiendo hacer uso opcional de parametros de busqueda, haciendo consumo de la api.
- src/pages/homepage.js: Archivo principal. Obtiene la carga de datos inicial y a帽ade los listener a distintos elementos del html de la p谩gina.
- src/utils/params/paramsUtils.js: Se encarga de tomar los parametros de busqueda desde el navegador, editarlos o borrarlos.
- src/config/api.js: Archivo de configuraci贸n de la API, solo contiene la url del backend, el cual se usa en products.js y categories.js.
- src/utils/data/loadData.js: Se encarga de hacer el request a la API con los productos y categorias, haciendo uso tambien de los parametros de busqueda, como nombre, categoria, pagina y orden.
- src/utils/rendering/*: Estos archivos se encargan de renderizar dinamicamente los elementos de la pagina dependiendo de los datos obtenidos, como el indicador de actividad, las categorias, paginaci贸n, y lo mas importante, el grid de productos.

![](documentation/images/files.png)



_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
