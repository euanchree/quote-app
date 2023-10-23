// Euan Chree
// 1912490

// Imports
import mongoose from "mongoose";

// Schema for  person
const personSchema = new mongoose.Schema({
    // Name of person
    personName: {
        type: String,
        trim: true,
        required: "Name of person is required."
    },

    // Pay Grade of person
    payGrade: {
        type: String,
        trim: true,
        required: "Pay grade of person is required."
    },

    // Number of hours worked by the person
    hoursWorked: {
        type: Number,
        required: "Hours worked by a person is required."
    }
});

// Schema for an additional resources
const additionalResourceSchema = new mongoose.Schema({
    // Name of additional schema
    resourceName: {
        type: String,
        trim: true,
        required: "Name of additional resource is required."
    },

    // Cost of additional resource
    resourceCost: {
        type: Number,
        required: "Cost of additional resource is required."
    }
});

// Schema for a quote
const quoteSchema = new mongoose.Schema({
    // Name of the quote
    quoteName: {
        type: String,
        trim: true,
        required: "Name of the quote is required"
    },

    // List of people (workers) for the quote
    quotePeople: {
        type: [personSchema],
        required: "List of people working on the quote is required.",
        default: [{personName: "Person 1", payGrade: "Junior", hoursWorked: 10}]
    },

    // List of additional resources needed for the quote
    quoteAdditionalResources: {
        type: [additionalResourceSchema],
        required: "List of additional resources for the quote is required.",
        default: [{resourceName: "Resource 1", resourceCost: 10}]
    }
});

// Exporting
export default quoteSchema;