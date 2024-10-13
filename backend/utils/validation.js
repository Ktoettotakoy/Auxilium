/**
 * Validates the input JSON object to ensure it has the required fields.
 *
 * @param {Object} data - The input JSON object to validate.
 * @param {string} data.Problem - The problem description. This field is required and cannot be null or empty.
 * @param {string} [data.AdditionalInformation] - Optional additional information related to the problem.
 *
 * @returns {Object} Validation result.
 * @returns {boolean} isValid - Indicates if the input is valid.
 * @returns {number} [errorCode] IF THE isValid is false - The HTTP status code to return in case of validation failure.
 * @returns {string} [message] IF THE isValid is false - An error message describing why validation failed.
 *
 * @example
 * // Valid input example:
 * const validInput = {
 *   Problem: "I need help with my lease agreement",
 *   AdditionalInformation: "It's for a residential property"
 * };
 * const validation = validateInput(validInput);
 * console.log(validation); // { isValid: true }
 *
 * @example
 * // Invalid input example:
 * const invalidInput = { Problem: "" };
 * const validation = validateInput(invalidInput);
 * console.log(validation); // { isValid: false, errorCode: 422, message: "Problem field cannot be null or empty" }
 */
const validateInput = (data) => {
  console.log(data)
  // Check if 'Problem' is null or an empty string
  if (!data.Problem || data.Problem.trim() === "" || data.Problem.trim() === '') {
    return {
      isValid: false,
      errorCode: 422,
      message: "Problem field cannot be null or empty",
    };
  }

  return { isValid: true }; // If all checks pass, return valid
};

export default validateInput;
