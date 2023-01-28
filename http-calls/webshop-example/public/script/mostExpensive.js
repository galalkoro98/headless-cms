/**
 * Fill in the blanks to create a script
 * that prints the name of the most expensive item that someone can buy (after applying any discounts,
 * and not including any items that are out of stock)
 */

async function searchProductByName(nameStr) {
  const query = qs.stringify(
    {
      fields: ["name", "price", "outOfStock"],
      sort: ["price:desc"],
      filters: {
        price: {
          $gte: 0,
        },
        outOfStock: {
          $eq: false,
        },
        name: {
          $contains: nameStr,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  console.log("The query string", query);

  const baseUrl = "http://localhost:1337/api/products";
  const url = `${baseUrl}?${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    if (data.data.length > 0) {
      const mostExpensive = data.data[0];

      renderResults([
        "The name of the most expensive item:",
        mostExpensive.attributes.name,
      ]);

      return mostExpensive.attributes.name;
    } else if (!data.data.length > 0) {
      renderResults(["No Product found"]);
    } else {
      renderResults(["Something went wrong"]);
    }
  } catch (error) {
    console.log(error);
  }
}

// render results

const renderResults = (results) => {
  const resultContainer = document.getElementById(
    "list__result__most__expensive"
  );
  resultContainer.innerHTML = "";
  results.forEach((result) => {
    const resultElement = document.createElement("p");
    resultElement.innerText = result;
    resultContainer.appendChild(resultElement);
  });
};

let searchTimeoutToken = 0;
window.onload = () => {
  const searchInput = document.getElementById("search__name__most__expensive");
  const errorMessage = document.getElementById("error__message__expensive");
  searchInput.onkeyup = (event) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "Enter"
    ) {
      return;
    } else if (event.key === "Backspace" && searchInput.value.length === 0) {
      const clear = document.getElementById("list__result__most__expensive");
      clear.innerHTML = "";
      errorMessage.innerHTML =
        "Please enter at least one character to search for";

      return;
    }
    errorMessage.innerHTML = "";
    clearTimeout(searchTimeoutToken);
    searchTimeoutToken = setTimeout(() => {
      searchProductByName(searchInput.value);
    }, 500);
  };
};
