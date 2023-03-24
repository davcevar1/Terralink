const revenueInput = document.getElementById("my-revenue-input");
revenueInput.addEventListener("input", function() {
  const revenue = Math.floor(parseFloat(revenueInput.value));
  if (!isNaN(revenue)) {
    revenueInput.value = revenue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }
});
const expensesInput = document.getElementById("my-expenses-input");
expensesInput.addEventListener("input", function() {
  const expenses = Math.floor(parseFloat(expensesInput.value));
  if (!isNaN(expenses)) {
    expensesInput.value = expenses.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }
});
/**
function addClientName() {
  var container = document.getElementById("client-names-container");
  var input = document.createElement("input");
  input.className = "form-control";
  input.type = "text";
  var deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-default delete-client-name";
  deleteButton.innerHTML = '<span class="fa fa-times"></span>';
  deleteButton.onclick = function() {
    container.removeChild(div);
  };
  var div = document.createElement("div");
  div.className = "wf-control";
  div.style = "margin-bottom:8px; position:relative ;";
  div.appendChild(input);
  div.appendChild(deleteButton);
  container.appendChild(div);
}

function deleteClientName(button) {
  var container = document.getElementById("client-names-container");
  var div = button.parentNode;
  container.removeChild(div);
}
 */
// función para agregar un nuevo campo de nombre
function addName(containerId, deleteClassName) {
  var container = document.getElementById(containerId);
  var newInput = document.createElement("div");
  newInput.classList.add("wf-control", "text-right");
  newInput.style.marginBottom = "8px";
  newInput.style.position = "relative";
  var inputField = document.createElement("input");
  inputField.classList.add("form-control");
  inputField.type = "text";
  newInput.appendChild(inputField);
  var deleteButton = document.createElement("button");
  deleteButton.classList.add(deleteClassName);
  deleteButton.type = "button";
  deleteButton.style.position = "absolute";
  deleteButton.style.top = "5px";
  deleteButton.style.right = "5px";
  var deleteIcon = document.createElement("span");
  deleteIcon.classList.add("fa", "fa-times");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", function() {
    deleteName(this);
  });
  newInput.appendChild(deleteButton);
  container.appendChild(newInput);
}

// función para eliminar un campo de nombre existente
function deleteName(button) {
  var container = button.parentNode.parentNode;
  var inputField = button.parentNode.querySelector("input");
  container.removeChild(button.parentNode);
}

// función para agregar un nuevo campo de nombre de client
function addClientName() {
  addName("client-names-container", "btn-delete-client-name");
}

// función para agregar un nuevo campo de nombre de vendor
function addVendorName() {
  addName("vendor-names-container", "btn-delete-vendor-name");
}

// el siguientescript servira para enseñar el debit card 
/*$scope.mostrarMensaje = function() {
  if ($scope.request.mostrarCampos == 'sip') {
    return true;
  } else {
    return false;
  }
}*/


