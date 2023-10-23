// Euan Chree
// 1912490

// Imports
import axios from "axios";

// Function to get the cost of a quote item from the api
function calculateCost(quoteItem, index) {
    // Request URI
    let requestURI = "http://127.0.0.1:8000/api/quote"

    // Requesting the cost
    axios.post(requestURI, quoteItem).then(function (response) {
        console.log(response)
        // Displaying the cost
        document.getElementById(("cost" + index)).innerHTML = ("Final Budget: £" + Math.round(response["data"]["quoteCost"]))
    });
}

// Function to create the person list component
function createPersonList(quoteItem, quoteIndex) {
    if (quoteItem["quotePeople"].length == 0) {
        // If there are no people in the quote
        return (
            <>
                <p class="title is-5">No people in quote!</p><br></br>
            </>
        )
    } else {
        // If there are people in the quote
        return (
            <>
                {quoteItem["quotePeople"].map((item, index) => (personListItem(index, item, quoteIndex)))}<br></br><br></br>
            </>
        )
    }
}

// Function to return a component for a person list item
function personListItem(index, personItem, quoteIndex) {
    return (
        <>  
            <br></br>
            <div class="people-list-item">
                <input class="input" maxLength="100" type="text" placeholder={personItem["personName"]} id={"personName" + index + "-" + quoteIndex}></input>
                <select class="input" id={"personPayGrade" + index + "-" + quoteIndex} defaultValue={personItem["payGrade"]}>
                    <option value="Junior">Junior</option>
                    <option value="Standard">Standard</option>
                    <option value="Senior">Senior</option>
                </select>
                <input class="input" type="number" min="0" placeholder={personItem["hoursWorked"]} id={"personHoursWorked" + index + "-" + quoteIndex}></input>
                <button class="button" onClick={() => deletePerson(index, quoteIndex)}>Delete</button>
            </div>
            <br></br>
        </>
    );
}

// Function to add an additional person to a quote
function createPerson(quoteIndex) {
    // Getting and altering the user
    let user = JSON.parse(sessionStorage.getItem("auth"))
    user["user"]["quotes"][quoteIndex]["quotePeople"].push({"personName": "Person 1", "payGrade": "Junior","hoursWorked": 10});
    // Saving the changes to session state and reloading the page
    sessionStorage.setItem("auth", JSON.stringify(user))
    window.location.reload();
}

// Function to delete a person from a quote
function deletePerson(index, quoteIndex) {
     // Getting and altering the user
    let user = JSON.parse(sessionStorage.getItem("auth"))
    user["user"]["quotes"][quoteIndex]["quotePeople"].splice(index, 1)
    // Saving the changes to session state and reloading the page
    sessionStorage.setItem("auth", JSON.stringify(user))
    window.location.reload();
}

// Function to create the additional cost list component
function createAdditionalCostList(quoteItem, quoteIndex) {
    if (quoteItem["quoteAdditionalResources"].length == 0) {
        // If there are no additional costs in the quote
        return (
            <>
                <p class="title is-5">No additioanl costs in quote!</p><br></br>
            </>
        )
    } else {
        // If there are additional costs in the quote
        return (
            <>
                {quoteItem["quoteAdditionalResources"].map((item, index) => (additionalCostListItem(index, item, quoteIndex)))}<br></br><br></br>
            </>
        )
    }
}

// Function to create the additional cost list component
function additionalCostListItem(index, additionalCostItem, quoteIndex) {
    return (
        <>  
            <br></br>
            <div class="additional-cost-list-item">
                <input class="input" maxLength="100" type="text" placeholder={additionalCostItem["resourceName"]} id={"resourceName" + index + "-" + quoteIndex}></input>
                <input class="input" type="number" min="0" placeholder={additionalCostItem["resourceCost"]} id={"resourceCost" + index + "-" + quoteIndex}></input>
                <button class="button" onClick={() => deleteAdditionalCost(index, quoteIndex)}>Delete</button>
            </div>
            <br></br>
        </>
    )
}

// Function to create an additional cost in a quote
function createAdditionalCost(quoteIndex) {
    // Getting and altering the additioncal object
    let user = JSON.parse(sessionStorage.getItem("auth"))
    user["user"]["quotes"][quoteIndex]["quoteAdditionalResources"].push({"resourceName": "Resource 1", "resourceCost": 10});
    // Saving the changes to session state and reloading the page
    sessionStorage.setItem("auth", JSON.stringify(user))
    window.location.reload();
}

// Function to delete an additioanl cost from a quote
function deleteAdditionalCost(index, quoteIndex) {
    // Getting and altering the additioncal object
    let user = JSON.parse(sessionStorage.getItem("auth"))
    user["user"]["quotes"][quoteIndex]["quoteAdditionalResources"].splice(index, 1);
    // Saving the changes to session state and reloading the page
    sessionStorage.setItem("auth", JSON.stringify(user))
    window.location.reload();
}

// Function to create a quote
function createQuote() {
    // Getting and the user account
    let user = JSON.parse(sessionStorage.getItem("auth"))
    user["user"]["quotes"].push({"quoteName": ("Quote #" + Math.floor(Math.random() * 1000)), "quotePeople": [{"personName": "Person 1", "payGrade": "Junior","hoursWorked": 10}], "quoteAdditionalResources": [{"resourceName": "Resource 1", "resourceCost": 10}]});
    // Saving the changes and reloading the page
    sessionStorage.setItem("auth", JSON.stringify(user))
    window.location.reload();
}

// Function to return a component for a quote list item
function quoteListItem(index, quoteItem) {
    // Variables to hold the index of the current quote
    let quoteIndex = index;
    // Request the price
    calculateCost(quoteItem, index)
    // Creating the react component
    return (
        <>  
            <div class="box quote-list-item">
                <div class="quote-item-header">
                    <p class="title is-3">{quoteItem["quoteName"]}</p>
                    <p class="title is-3 snap-right" id={"cost" + index}>Final Budget: £</p><br></br>
                </div>

                <div class="box people-list">
                    <p class="title is-4">People</p><br></br>
                    {createPersonList(quoteItem, quoteIndex)}
                    <button class="button" onClick={() => createPerson(quoteIndex)}>Add person</button><br></br>
                </div>

                <div class="box additional-cost-list">
                    <p class="title is-4">Additional Costs</p><br></br>
                    {createAdditionalCostList(quoteItem, quoteIndex)}
                    <button class="button" onClick={() => createAdditionalCost(quoteIndex)}>Add Additional Cost</button><br></br>
                </div>
                <button class="button" onClick={() => updateQuote(index)}>Update Quote</button>
                <button class="button" onClick={() => deleteQuote(index)}>Delete Quote</button>
            </div>
        </>
    );
}

// Function to delete a quote
function deleteQuote(index) {
    // Getting the user account from the session state
    let user = JSON.parse(sessionStorage.getItem("auth"))
    // Removing the quote
    user["user"]["quotes"].splice(index, 1)
    // Saving the changes and reloading the page.
    sessionStorage.setItem("auth", JSON.stringify(user))
    window.location.reload();
}

// Function to update a quote (react to new names and values)
function updateQuote(index) {
    console.log("Updating quote:",index)
    // Getting the user account from the session state
    let user = JSON.parse(sessionStorage.getItem("auth"));
    // Getting the people and additional cost lists
    let people = user["user"]["quotes"][index]["quotePeople"]
    let additionalCosts = user["user"]["quotes"][index]["quoteAdditionalResources"]

    // Checking the people list for changed first
    for (let i = 0; i < people.length; i++) {
        // Getting info from user
        let personPayGrade = people[i]["payGrade"];

        // Checking if anything has changed from each feild of the person and updating the user account in session state if it has
        if (document.getElementById("personName" + i + "-" + index).value !== "") {
            user["user"]["quotes"][index]["quotePeople"][i]["personName"] = document.getElementById("personName" + i + "-" + index).value;
        } 
        
        if (document.getElementById("personPayGrade" + i + "-" + index).value !== personPayGrade) {
            user["user"]["quotes"][index]["quotePeople"][i]["payGrade"] = document.getElementById("personPayGrade" + i + "-" + index).value;
        }
        
        if (document.getElementById("personHoursWorked" + i + "-" + index).value !== "") {
            user["user"]["quotes"][index]["quotePeople"][i]["hoursWorked"] = document.getElementById("personHoursWorked" + i + "-" + index).value;
        }

        console.log(i, document.getElementById("personName" + i + "-" + index).value, document.getElementById("personPayGrade" + i + "-" + index).value, document.getElementById("personHoursWorked" + i + "-" + index).value)
    }

    // Updating values from the additional costs list
    for (let i = 0; i < additionalCosts.length; i++) {
        // Checking if anything has changed
        if (document.getElementById("resourceName" + i + "-" + index).value !== "") {
            user["user"]["quotes"][index]["quoteAdditionalResources"][i]["resourceName"] = document.getElementById("resourceName" + i + "-" + index).value;
        } else if (document.getElementById("resourceCost" + i + "-" + index).value !== "") {
            user["user"]["quotes"][index]["quoteAdditionalResources"][i]["resourceCost"] = document.getElementById("resourceCost" + i + "-" + index).value;
        }
    }

    // Updating the user in the current state
    console.log("Updated User", JSON.stringify(user, null, 2));
    sessionStorage.setItem("auth", JSON.stringify(user));

    // Reloading window
    window.location.reload();
}


// Function to save the quotes
function saveQuotes() {
    // Getting user from the current state
    let user = JSON.parse(sessionStorage.getItem("auth"))["user"]
    
    // Varibales for controling the request
    let userId = user["_id"]
    let requestURI = "http://127.0.0.1:8000/api/users/" + userId
    let token = JSON.parse(sessionStorage.getItem("auth"))["token"]
    
    // Removing id field
    delete user["id"]

    // Preparing user for updating
    let quotes = user["quotes"];

    for (let i = 0; i < quotes.length; i++) {
        // Getting the info from the user
        let quote = quotes[i]
        let people = quote["quotePeople"]
        let additionalCosts = quote["quoteAdditionalResources"]
        // Removing the id from the quote
        delete user["quotes"][i]["_id"]
        // Preparing persons
        for (let peopleIndex = 0; peopleIndex < people.length; peopleIndex++) {
            delete user["quotes"][i]["quotePeople"][peopleIndex]["_id"]
        }
        // Preparing additional costs
        for (let additionalIndex = 0; additionalIndex < additionalCosts.length; additionalIndex++) {
            delete user["quotes"][i]["quoteAdditionalResources"][additionalIndex]["_id"]
        }
    }

    // Requesting the update
    axios.put(requestURI, user, { "headers" : { "Authorization": ("Bearer " + token)}}).then(function (response) {
        console.log(response)
    });
}

// Function to create a "create quote button"
function createQuoteButton() {
    return <button class="button" onClick={createQuote}>Create Quote</button>
}

// Function which creates the base quote menu component
export default function QuotesMenu() {
    // Getting the current user
    let authUser = sessionStorage.getItem('auth')

    // Returning if no one is logged in
    if (!authUser) {
        console.log("User is not logged in not displaying quotes");
        return (<></>)
    }

    // Getting the quotes from the user
    let quotes = JSON.parse(authUser)["user"]["quotes"];
    
    if (quotes.length === 0) {
        // If there are no quotes
        return (
            <>
                <p class="title is-4">No quotes in Account</p>
                {createQuoteButton()}
            </>
        )
    } else {
        // If there are quotes
        return (
            <>  
                <div class="quote-list">
                    <p class="title is-3">Quotes Menu</p>
                    {quotes.map((item, index) => ( quoteListItem(index, item)))}
                    {createQuoteButton()}
                    <button class="button" onClick={() => saveQuotes()}>Save Changes to Quotes</button>
                </div>
            </>
        )
    }
}