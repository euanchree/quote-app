// Euan Chree
// 1912490

// Imports
import User from "./user.model.js"
import errorHandler from "./dbErrorHandler.js"
import lodash from "lodash"
import config from "./config.js"

// Function allow the creation of a user
const create = async (req, res) => {
    console.log("Received Request to create user ...")

    if (req.body.password.length < 10) {
        return res.status(401).json({
            error: "Password too week."
        });
    }

    // Getting user from the request
    const user = new User(req.body);
    console.log(user)
    try {
        // Saving the user
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!"
        });
    } catch (err) {
        // Reporting error
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
  
// Function to list all of the users on the database
const list = async (req, res) => {
    console.log("Received Request to list users ...")
    try {
        // Getting the users from the database
        let users = await User.find().select("name email updated created");
        console.log("Got users" + users);
        // Returing the list of users
        res.json(users);
    } catch (err) {
        // Reporting error
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

// Function to calculate the cost of a quote
const calculatePrice = async(req, res) => {
    console.log("Received Request to calculate cost of quote ...")
    try {
        // Getting the quote
        let quote = req.profile;
        quote = lodash.extend(quote, req.body)
        console.log(quote["quoteName"]);

        // Initialising the cost of the qutoe
        let quoteCost = 0;

        // Creating the fudge factor
        // Random number between a min and max value adapted from
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        let fudgeFactor = (Math.random() * (1.05 - 0.95) + 0.95);
        console.log("Fudge Factor", fudgeFactor)

        // Adding cost of the people on the quote
        for (let index = 0; index < quote["quotePeople"].length; index++) {

            // Getting the person from the quote
            let person = quote["quotePeople"][index];

            // Getting pay of person
            let payGrade = person["payGrade"];
            let hourly = 15;

            switch(payGrade) {
                case "Junior":
                    hourly = config.juniorPay;
                    break;
                case "Standard":
                    hourly = config.standardPay;
                    break;
                case "Senior":
                    hourly = config.seniorPay;
                    break;
                default:
                    hourly = config.juniorPay;
            }
            
            // Calculating and adding the cost of the worker
            quoteCost += ((person["hoursWorked"] * hourly) * fudgeFactor)
            console.log("Added Worker: ", quoteCost)
        }

        // Adding the additional costs
        for (let index = 0; index < quote["quoteAdditionalResources"].length; index++) {
            // Getting the additional cost
            var additionalCost = quote["quoteAdditionalResources"][index];

            // Adding the cost
            quoteCost += parseFloat(additionalCost["resourceCost"]);

            console.log("Added " + quote["quoteAdditionalResources"][index] + ":", parseFloat(additionalCost["resourceCost"]), quoteCost)
        }

        res.json({"quoteCost": quoteCost});
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
  
// Function to retreive the user by id
const userByID = async (req, res, next, id) => {
    console.log("Received Request get user by id ...")
    try {
        // Getting user
        console.log("Getting user: "+id)
        let user = await User.findById(id);

        // Reporting if the user is not found
        if (!user)
            return res.status("400").json({
                error: "User not found"
            });
        
        // Returning user
        req.profile = user;
        next();
    } catch (err) {
        // Reporting error
        return res.status(400).json({
            error: "Could not retrieve user"
        });
    }
}

// Function to get information on a user
const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}
  
// Function to update a user in the database
const update = async (req, res) => {
    console.log("Received Request to update user ...")
    try {
        let user = req.profile;
        user = lodash.extend(user, req.body);
        console.log("Profile", req.profile)
        console.log("Body", req.body)
        console.log("User", user)
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
  
// Function to delete a user from the database
const remove = async (req, res) => {
    console.log("Received Request to remove user ...")
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

// Export functions
export default {
  create,
  userByID,
  read,
  list,
  calculatePrice,
  remove,
  update
}