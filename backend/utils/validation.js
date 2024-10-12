// input: json object {Problem:"", AdditionalInformation:""}
// validates input json object 
// expected response is 
// {
//  Problem: "not null",
//  AdditionalInformation: "null|else"
// }
// return: {isValid: true} or {isValid:false, errorCode:CODE, message: "ErrorMessage"}
const validateInput = (data) => {
    // Check if 'Problem' is null or an empty string
    if (!data.Problem || data.Problem.trim() === '') {
        return { isValid: false, errorCode: 422, message: 'Problem field cannot be null or empty' };
    }

    return { isValid: true }; // If all checks pass, return valid
};

export default validateInput;
