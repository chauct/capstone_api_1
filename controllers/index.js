function getListProduct() {
  axios({
    url: "https://62d007951cc14f8c0882d7fe.mockapi.io/api/products",
    method: "GET",
  })
    .then(function (result) {
      renderProducts(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getProduct(id) {
  axios({
    url: "https://62d007951cc14f8c0882d7fe.mockapi.io/api/products/" + id,
    method: "GET",
  })
    .then(function (res) {
      document.getElementById("btnThemSP").click();

      document.getElementById("name").value = res.data.name;
      document.getElementById("price").value = res.data.price;
      document.getElementById("screen").value = res.data.screen;
      document.getElementById("type").value = res.data.type;
      document.getElementById("frontCam").value = res.data.frontCamera;
      document.getElementById("backCam").value = res.data.backCamera;
      document.getElementById("image").value = res.data.img;
      document.getElementById("description").value = res.data.desc;
      document.getElementById("productId").value = res.data.id;

      document.getElementById("btnSaveInfo").style.display = "none";
      document.getElementById("btnUpdate").style.display = "inline";
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateProduct() {
  var prodName = document.getElementById("name").value;
  var prodPrice = document.getElementById("price").value;
  var prodScreen = document.getElementById("screen").value;
  var prodType = document.getElementById("type").value;
  var prodFrontCam = document.getElementById("frontCam").value;
  var prodBackCam = document.getElementById("backCam").value;
  var prodImg = document.getElementById("image").value;
  var prodDescription = document.getElementById("description").value;
  var prodId = document.getElementById("productId").value;

  var product = new Product(
    prodName,
    prodPrice,
    prodScreen,
    prodBackCam,
    prodFrontCam,
    prodImg,
    prodDescription,
    prodType
  );

  axios({
    url: "https://62d007951cc14f8c0882d7fe.mockapi.io/api/products/" + prodId,
    method: "PUT",
    data: product,
  })
    .then(function (res) {
      getListProduct();
      console.log(res.data);
      document.getElementById("btnCloseModal").click();
      document.getElementById("btnSaveInfo").style.display = "block";
      document.getElementById("btnUpdate").style.display = "none";
      document.getElementById("btnReset").click();
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function deleteProduct(id) {
  axios({
    url: "https://62d007951cc14f8c0882d7fe.mockapi.io/api/products/" + id,
    method: "DELETE",
  })
    .then(function (res) {
      alert("Xóa thành công !");
      getListProduct();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function createProduct() {
  var isValid = validateForm();

  if (!isValid) return;

  var prodName = document.getElementById("name").value;
  var prodPrice = document.getElementById("price").value;
  var prodScreen = document.getElementById("screen").value;
  var prodType = document.getElementById("type").value;
  var prodFrontCam = document.getElementById("frontCam").value;
  var prodBackCam = document.getElementById("backCam").value;
  var prodImg = document.getElementById("image").value;
  var prodDescription = document.getElementById("description").value;

  var product = new Product(
    prodName,
    prodPrice,
    prodScreen,
    prodBackCam,
    prodFrontCam,
    prodImg,
    prodDescription,
    prodType
  );

  axios({
    url: "https://62d007951cc14f8c0882d7fe.mockapi.io/api/products",
    method: "POST",
    data: product,
  })
    .then(function (res) {
      getListProduct();

      console.log(res.data);
      document.getElementById("btnCloseModal").click();
      document.getElementById("btnReset").click();
      document.getElementById("btnSaveInfo").style.display = "block";
      document.getElementById("btnUpdate").style.display = "none";
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

getListProduct();

function renderProducts(data) {
  var contentHTML = "";
  for (var i = 0; i < data.length; i++) {
    var productImg = data[i].img.includes("https")
      ? data[i].img
      : `./../../assets/img/${data[i].img}`;

    contentHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].screen}</td>
        <td>${data[i].frontCamera}</td>
        <td>${data[i].backCamera}</td>
        <td>
          <img width="50px" src="${productImg}" alt="${data[i].name}">
        </td>
        <td>${data[i].desc}</td>
         <td>${data[i].type}</td>
        <td class="d-flex justify-content-between">
          <button  onclick="deleteProduct('${
            data[i].id
          }')" class=" btn btn-danger mr-4">
          <i class="fa-solid fa-trash-can"></i>
          </button>
          <button onclick="getProduct('${
            data[i].id
          }')" class=" btn btn-info"><i class="fa-solid fa-pen-to-square"></i></button>
        </td>
      </tr>
    
    `;
  }
  document.getElementById("tblProductList").innerHTML = contentHTML;
}

// -------------------validate form ------------------------------
function validateForm() {
  var isValid = true;

  var prodName = document.getElementById("name").value;
  var prodPrice = document.getElementById("price").value;
  var prodScreen = document.getElementById("screen").value;
  var prodType = document.getElementById("type").value;
  var prodFrontCam = document.getElementById("frontCam").value;
  var prodBackCam = document.getElementById("backCam").value;
  var prodImg = document.getElementById("image").value;
  var prodDescription = document.getElementById("description").value;

  isValid &= checkRequired(prodName, "spanName");

  isValid &=
    checkRequired(prodPrice, "spanPrice") &&
    checkNumber(prodPrice, "spanPrice");

  isValid &= checkRequired(prodScreen, "spanScreen");

  isValid &= checkType("type", "spanType");

  isValid &= checkRequired(prodFrontCam, "spanFrontCam");

  isValid &= checkRequired(prodBackCam, "spanBackCam");

  isValid &= checkRequired(prodImg, "spanImage");

  isValid &= checkRequired(prodDescription, "spanDesc");

  return isValid;
}

function checkRequired(val, spanId) {
  if (val.length > 0) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML = "* Trường này bắt buộc nhập";
  return false;
}

function checkNumber(val, spanId) {
  var letter = /^[0-9]+$/;
  if (val.match(letter)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  //false
  document.getElementById(spanId).innerHTML = "* Vui lòng nhập số";
  return false;
}

function checkType(selectId, spanId) {
  if (document.getElementById(selectId).selectedIndex !== 0) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(spanId).innerHTML = "* Vui lòng chọn loại SP";
  return false;
}
