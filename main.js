"use strict";

// crudcrud api key
const apiKey = "e0723aab5e7640bbbff5f226b4afacd0";

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
<li class="expense-list-item" id=${expense_obj._id}> Category: ${expense_obj.category}, Description: ${expense_obj.description} -----> Expense: ₹${expense_obj.expence} 

<button onclick = deleteExpense('${expense_obj._id}')>Delete</button>
<button onclick=editExpense('${JSON.stringify(expense_obj)}')>Edit</button>

</li>
`;
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