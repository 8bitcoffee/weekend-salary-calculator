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

    event.preventDefault(); // Prevents page refresh

    let firstName = document.querySelector('#first-name').value; // First name input field
    firstName == "" ? firstName = "Peter" : null; // default value
    let lastName = document.querySelector('#last-name').value; // Last name input field
    lastName == "" ? lastName = "Venkman" : null; // default value
    let id = document.querySelector('#id-number').value; // id input field
    id == "" ? id = "ECTO-1" : null; // default value
    let jobTitle = document.querySelector('#job-title').value; // job title input field
    jobTitle == "" ? jobTitle = "Ghostbuster" : null; // default value
    let annualSalary = document.querySelector('#annual-salary').value; // annual salary input field

    // removes cents if included in salary
    if (annualSalary.includes('.')){
        annualSalary = annualSalary.replace(/\.\d+/,''); // Regex that eliminates the decimal and the following when
                                                             // the decimal is at the end followed by 2 numbers
    }

    // removes everything except numbers if included in salary. Returns as number instead of string.
    annualSalary = stripFormat(annualSalary);

    // Adds input field info to table. annualSalary is formated with commas.
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

    // Clears all input fields
    document.querySelector('#first-name').value = "";
    document.querySelector('#last-name').value = "";
    document.querySelector('#id-number').value = "";
    document.querySelector('#job-title').value = "";
    document.querySelector('#annual-salary').value = "";

    // updates the monthly wages total on DOM
    return updateTotal(annualSalary);
}

/**
 * Removes employee div from table. Pulls that employee annual salary from target and
 *      and passes it to updateTotal() as a negative number to remove that amount from monthly total.
 * @param {Object} event // event object returned by onClick 
 * @returns Passes to updateTotal as negative number.
 */
function removeEmployee(event){
    event.target.parentElement.parentElement.remove();
    let annualSalary = event.target.parentElement.parentElement.children[4].innerHTML;
    annualSalary = stripFormat(annualSalary); // returns as stripped format in number instead of string
    return updateTotal(0 - annualSalary);
}

/**
 * Updates monthly total on DOM as formatted string
 * @param {Number} annualSalary 
 */
function updateTotal(annualSalary){
    monthlyWages += Math.round(annualSalary / 12); // Converts to monthly from annual
    monthlyTotal.innerHTML = `
        Total monthly wages: $${formatCash(monthlyWages)}
    `;

}

/**
 * Takes number and returns as formatted string w/commas
 * @param {Number} salary 
 * @returns {String} formatted number
 */
function formatCash(salary){
    salary = Number(salary);
    let formattedSalary = salary.toLocaleString('en-US');
    return String(formattedSalary);
}

/**
 * Takes a string that hopefully contains some numbers. Strips anything except numbers
 * @param {String} fancyNumberString // String with commas and/or symbols
 * @returns {Number} Just the numbers in the same order and as a number.
 *                      Empty string returns as Number('0')
 */
function stripFormat(fancyNumberString){
    
    let tempstr = ''; // empty string that will collect the numbers

    for (let i in fancyNumberString){
        for (let x in [...Array(10).keys()]){ // creates and iterates over an array of numbers 0-9
            if (fancyNumberString[i] == x){
                tempstr += fancyNumberString[i]; // If the single character is a number, added to tempstr
            }
        }
    }

    return Number(tempstr); // returns the collected numbers in order as a number
}