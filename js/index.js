document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/api/books";
  const BASE_URL = "http://localhost:3000";
  //seleccionar los elementos del DOM

  const form = document.getElementById("book-form");
  const tableBody = document.getElementById("books-table-body");
  const bookIdinput = document.getElementById("book-id");
  const submitButton = document.getElementById("submit-button");
  const cancelButton = document.getElementById("cancel-button");

  const fetchbooks = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      //limpiar  tabla
      tableBody.innerHTML = "";
      if (
        !result.data ||
        !Array.isArray(result.data) ||
        result.data.length === 0
      ) {
        //actualizar  la  columnas
        tableBody.innerHTML = "<tr><td>no hay libros  registrados</td></tr>";
        return;
      }

      result.data.array.forEach((book) => {
        const row = `
                        <tr>
                        <td>${book.id}</td>
                        <td>${book.code}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.price}</td>
                        <td>${book.format}</td>
                        <td>${book.rating}</td>
                        <td class="action-buttons">
                        <button class="edit-btn" data-id="${book.id}">editar</button>
                        <button class="delete-btn" data-id="${book.id}">eliminar</button>
                        </td>
                        </tr>
                        `;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    } catch (error) {
      console.error("error al obtener los  libros", error);
    }
  };

  const resetForm = () => {
    form.reset();
    bookIdinput.value = "";
    submitButton.textContent = "agregar libro";
    cancelButton.style.display = "none";
  };
  //crear  y actualizar  un libro
form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    //vamos a  utlizar  formdata  para  poder  enviar  los   datos del formulario
    const formData = new FormData();
    formData.append("code",document.getElementById("code").value);
    formData.append("title",document.getElementById("title").value);
    formData.append("author",document.getElementById("author").value);
    formData.append("price",document.getElementById("price").value);
    formData.append("format",document.getElementById("format").value);
    formData.append("rating",document.getElementById("rating").value);
    formData.append("description",document.getElementById("description").value || null);


    const  bookId = bookIdinput.value;
    const method = bookId?"PUT":"POST";
    const url= bookId? `${API_URL}/${bookId}`:API_URL;


    try{
        const response = await  fetch(url,{
            method: method,
            body: formData
        });
        const result = await response.json();
        alert(result.message);
        if(result.status){
            resetForm();
            fetchbooks();
        }
    }catch(error){
        console.log("error al guardar libro:",error);
    }

});




});
