console.log("JS sourced"); // Testing 1,2,3

const tableBody = document.querySelector("#table-body"); // Where the employees are loaded
const monthlyTotal = document.querySelector("#monthly-total"); // The spot where the monthly total wages is changed

let monthlyWages = Math.round(65000/12); // Set with example value. Always kept as number

/**
 * Takes the user inputs and enters them into the table. Calculates the current total monthly
 *      wages given the annual wages of entered employees.
 * @param {Object} event // event from onSubmit click of form
 * @returns sends to updateTotal(annualSalary) where annualSalary is a the type - number of the employee
 *              annual salary stripped of all symbols.
 */
function addEmployee(event){

    event.preventDefault();

    let firstName = document.querySelector('#first-name').value;
    firstName == "" ? firstName = "Peter" : null;
    let lastName = document.querySelector('#last-name').value;
    lastName == "" ? lastName = "Venkman" : null;
    let id = document.querySelector('#id-number').value;
    id == "" ? id = "ECTO-1" : null;
    let jobTitle = document.querySelector('#job-title').value;
    jobTitle == "" ? jobTitle = "Ghostbuster" : null;
    let annualSalary = document.querySelector('#annual-salary').value;

    if (annualSalary.includes('.')){
        annualSalary = annualSalary.replace(/\.\d+/,'');
    }

    let tempstr = '';

    annualSalary = stripFormat(annualSalary);

    tableBody.innerHTML += `
        <tr>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${id}</td>
            <td>${jobTitle}</td>
            <td>$${formatCash(annualSalary)}</td>
            <td class="btn-cell"><button onClick="removeEmployee(event)" class="remove-btn">Remove</button></td>
        </tr>
    `;

    document.querySelector('#first-name').value = "";
    document.querySelector('#last-name').value = "";
    document.querySelector('#id-number').value = "";
    document.querySelector('#job-title').value = "";
    document.querySelector('#annual-salary').value = "";

    return updateTotal(annualSalary);
}

function removeEmployee(event){
    event.target.parentElement.parentElement.remove();
    let annualSalary = event.target.parentElement.parentElement.children[4].innerHTML;
    annualSalary = stripFormat(annualSalary);
    return updateTotal(0 - annualSalary);
}

function updateTotal(annualSalary){
    monthlyWages += Math.round(annualSalary / 12);
    monthlyTotal.innerHTML = `
        Total monthly wages: $${formatCash(monthlyWages)}
    `;

}

function formatCash(salary){
    salary = Number(salary);
    let formattedSalary = salary.toLocaleString('en-US');
    return String(formattedSalary);
}

function stripFormat(fancyNumberString){
    let tempstr = '';

    for (let i in fancyNumberString){
        for (let x in [...Array(10).keys()]){
            if (fancyNumberString[i] == x){
                tempstr += fancyNumberString[i];
            }
        }
    }

    return Number(tempstr);
}