/**
 * 
 * !!! Make sure that the webshop example is running before attempting to run these exercises 
/**
 * Writing down complex querystrings by hand can be a difficult task.
 * Luckily libraries exist that can help us to generate the right querystring programmatically.
 * One of these libraries is qs, and in the following exercises we will practise using qs to perform
 * fetch request in order to answer questions about the system.
 *
 * Throughout these exercises the strapi api endpoint documentation will be useful:
 * https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#api-endpoints
 */

/**
 * In this example we want to print a nice overview of the name and price of all products that cost between 15€ and 40€
 */

const productList = document.querySelector(".product-list");

const displayProducts = (products) => {
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const productName = document.createElement("h3");
    productName.classList.add("productName");
    productName.innerHTML = `Name: ${product.attributes.name}`;

    const productPrice = document.createElement("p");
    productPrice.classList.add("productPrice");
    productPrice.innerHTML = `Price: ${product.attributes.price}`;

    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);

    productList.appendChild(productDiv);
  });
};

const intro = async () => {
  const query = qs.stringify(
    {
      fields: ["name", "price"],
      filters: {
        price: {
          $lte: 40,
          $gte: 15,
        },
      },
      sort: ["price:asc"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(`http://localhost:1337/api/products?${query}`);
  const result = await response.json();
  displayProducts(result.data);
};

intro();
