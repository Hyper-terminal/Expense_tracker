"use strict";

// crudcrud api key
const apiKey = "77768f904bbd4fb7a87681eba06eea72";

let axiosInstance = axios.create({
    baseURL: "https://crudcrud.com/api/" + apiKey
});


// show all expense list items on dom content load / on page load
window.addEventListener("DOMContentLoaded", async () => {

    try {
        let res = await axiosInstance('/Expense');

        let responseArray = res.data;

        // loop through response array and print objects on screen
        responseArray.forEach((item) => {
            showExpenses(item)
        })
    }
    catch (err) { console.error(err) }
})


// add functionality
const addExpence = async (e) => {
    e.preventDefault();
    try {
        const { expence: { value: expence }, description: { value: description }, category: { value: category } } = e.target;

        const expenceObj = {
            expence,
            description,
            category
        }


        const res = await axiosInstance.post('/Expense', expenceObj);
        showExpenses(res.data);

        // clear input fields
        e.target.description.value = "", e.target.expence.value = "", e.target.category.value = "";

    }
    catch (err) {
        console.error(err);
    }

}

// show expense list items by passing actual expense object
function showExpenses(expense_obj) {

    let parentnode = document.getElementById("users");

    let childHtml = `

<div class="col-md-4 col-sm-6 col-xs-12 col-lg-3" id=${expense_obj._id}>
<div  class="card" style="width: 100%; text-align: center;">
<div class="card-body">
    <h3>Amount: ₹${expense_obj.expence}</h3>
    <h5 class="card-title">Category: ${expense_obj.category}</h5>
    <p class="card-text">Description: ${expense_obj.description}</p>
    
    <button class="btn btn-danger" onclick = deleteExpense('${expense_obj._id}')>Delete</button>
    <button class="btn btn-primary" onclick=editExpense('${JSON.stringify(expense_obj)}')>Edit</button>
    
  </div>
</div>
</div>
`
    parentnode.innerHTML += childHtml;
}

// edit functionality
function editExpense(expence) {

    const expense_obj = JSON.parse(expence);

    document.getElementById("expence").value = expense_obj.expence;
    document.getElementById("description").value = expense_obj.description;
    document.getElementById("category").value = expense_obj.category;

    deleteExpense(expense_obj._id);
}


// delete functionality
async function deleteExpense(id) {

    try {
        let res = await axiosInstance.delete('/Expense/' + id);
        removeFromScreen(id);
    }
    catch (err) { console.error(err); }

}



// remove from ui

function removeFromScreen(id) {

    const parentnode = document.getElementById("users");
    const nodeToBeDeleted = document.getElementById(id);
    if (nodeToBeDeleted) parentnode.removeChild(nodeToBeDeleted);

}