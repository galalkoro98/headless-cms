async function searchProductByName(nameStr) {
  const query = qs.stringify(
    {
      fields: ["name"],
      sort: ["name:asc"],
      filters: {
        name: {
          $contains: nameStr,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const baseUrl = "http://localhost:1337/api/products";
  const url = `${baseUrl}?${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    const result = data.data.map((product) => product.attributes.name);
    renderResults(result);
  } catch (error) {
    console.error(error);
  }
}

// render results

const renderResults = (results) => {
  const resultContainer = document.getElementById("list__result");
  resultContainer.innerHTML = "";
  results.forEach((result) => {
    const resultElement = document.createElement("li");
    resultElement.innerText = result;
    resultContainer.appendChild(resultElement);
  });
};

let searchTimeoutToken = 0;
window.onload = () => {
  const searchInput = document.getElementById("search__name");
  const errorMessage = document.getElementById("error__message");
  searchInput.onkeyup = (event) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "Enter"
    ) {
      return;
    }

    if (event.key === "Backspace" && searchInput.value.length === 0) {
      errorMessage.innerHTML =
        "Please enter at least one character to search for";
      return;
    } else {
      errorMessage.innerHTML = "";
    }

    if (searchTimeoutToken) {
      clearTimeout(searchTimeoutToken);
    }

    searchTimeoutToken = setTimeout(() => {
      searchProductByName(searchInput.value);
    }, 250);
  };
};
