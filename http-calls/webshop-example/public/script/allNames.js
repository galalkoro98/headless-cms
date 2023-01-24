const nameOfProduct = document.querySelectorAll(".nameOfProduct");
const printsNameOfAllProduct = async () => {
  const query = qs.stringify(
    {
      fields: ["name"],
      sort: ["name:asc"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(`http://localhost:1337/api/products/?${query}`);
  const data = await response.json();
  data.data.forEach((product, index) => {
    nameOfProduct[index].innerText = product.attributes.name;
  });
};

printsNameOfAllProduct();
