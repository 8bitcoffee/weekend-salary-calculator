console.log("JS sourced"); // Testing 1,2,3

const tableBody = document.querySelector("#table-body");
const monthlyTotal = document.querySelector("#monthly-total");

let monthlyWages = Math.round(65000/12);

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

    for (let i in annualSalary){
        for (let x in [...Array(10).keys()]){
            if (annualSalary[i] == x){
                tempstr += annualSalary[i];
            }
        }
    }
    annualSalary = tempstr;
    annualSalary = Number(annualSalary);

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
    console.log(annualSalary);
    annualSalary = annualSalary.replace('$','');
    annualSalary = annualSalary.replace(',','');
    annualSalary = Number(annualSalary);
    console.log(annualSalary);
    return updateTotal(0 - annualSalary);
}

function updateTotal(annualSalary){
    monthlyWages += Math.round(annualSalary / 12);
    monthlyTotal.innerHTML = `
        Total monthly wages: $${formatCash(String(monthlyWages))}
    `;

}

function formatCash(salary){
    salary = Number(salary);
    let formattedSalary = salary.toLocaleString('en-US');
    return String(formattedSalary);
}