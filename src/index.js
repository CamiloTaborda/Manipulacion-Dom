const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

appNode.addEventListener("clcik", (event) => {
    if (event.target.nodeName === "h2") {
        window.alert("Hola");
    }
})

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",
    }).format(price);

    return newPrice;
}

window.fetch(`${baseUrl}/api/avo`)
  .then((response) => response.json())
  .then(data => {
    const allItems = [];

    data.data.forEach((item) => {
      const image = document.createElement("img");
      image.src = `${baseUrl}${item.image}`;
      image.classList.add("w-full", "max-w-xs", "mx-auto");

      const title = document.createElement("h2");
      title.textContent = item.name;
      title.addEventListener("click", () => {
        window.alert("Hola")
      })
      title.classList.add("text-xl", "font-semibold", "mt-2");

      const price = document.createElement("div");
      price.textContent = formatPrice(item.price)
      price.classList.add("text-lg");

      const container = document.createElement("div");
      container.classList.add("flex", "flex-col", "items-center", "bg-gray-200", "p-4", "rounded-lg", "shadow-md", "mb-4", "hover:bg-gray-300", "transition", "duration-300", "ease-in-out");
      container.append(image, title, price);

      allItems.push(container);
    });

    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid", "grid-cols-3", "gap-4", "mx-auto", "max-w-screen-lg");
    gridContainer.append(...allItems);

    // Agregar margen entre los contenedores en la cuadrícula
    gridContainer.classList.add("divide-y-0", "divide-x-4");

    appNode.appendChild(gridContainer);
  });