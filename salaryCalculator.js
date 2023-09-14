console.log("JS sourced"); // Testing 1,2,3

const tableBody = document.querySelector("#table-body");
const monthlyTotal = document.querySelector("#monthly-total");

let monthlyWages = Math.round(65000/12);

function addEmployee(event){

    event.preventDefault();

    let firstName = document.querySelector('#first-name').value;
    let lastName = document.querySelector('#last-name').value;
    let id = document.querySelector('#id-number').value;
    let jobTitle = document.querySelector('#job-title').value;
    let annualSalary = document.querySelector('#annual-salary').value;

    tableBody.innerHTML += `
        <tr>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${id}</td>
            <td>${jobTitle}</td>
            <td>${annualSalary}</td>
            <td class="btn-cell"><button onClick="removeEmployee(event)" class="remove-btn">Remove</button></td>
        </tr>
    `;

    return updateTotal(annualSalary);
}

function removeEmployee(event){
    event.target.parentElement.parentElement.remove();
    return updateTotal(0 - Number(event.target.parentElement.parentElement.children[4].innerHTML));
}

function updateTotal(annualSalary){
    monthlyWages += Math.round(annualSalary / 12);
    monthlyTotal.innerHTML = `
        Total monthly wages: $${monthlyWages}
    `;

}