import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "../constant/FILE_CONFIG.js";

/**
 * Update a specific field in a form data object.
 *
 * Creates a new object by copying the existing form data and
 * updating the specified field with the provided value.
 *
 * @param {Object} formData - The current form data object.
 * @param {string} field - The key of the field to update.
 * @param {*} value - The new value for the specified field.
 * @returns {Object} A new form data object with the updated field.
 *
 * @example
 * const formData = { name: "Alice", age: 25 };
 * const newFormData = updateFormData(formData, "age", 26);
 * console.log(newFormData); // { name: "Alice", age: 26 }
 */
function updateFormData(formData, field, value) {
  return { ...formData, [field]: value };
}

/**
 * Validate an image file against allowed types and max size
 * @param {File} fileImg - The file to validate
 * @param {string[]} allowedTypes - Allowed MIME types
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {boolean} true if file is valid, false otherwise
 */
function validImgFile(
  fileImg,
  allowedTypes = ALLOWED_IMAGE_TYPES,
  maxSize = MAX_IMAGE_SIZE
) {
  // FIX: Return an object with an error message, not just boolean 'false'
  if (!fileImg || !(fileImg instanceof File)) {
    return { isValid: false, error: "Invalid file or no file selected." };
  }

  const { size, type } = fileImg;

  const isAllowImgType = (type) => allowedTypes.includes(type);
  const isSizeExceed = (size) => size > maxSize;

  if (!isAllowImgType(type))
    return {
      isValid: false,
      error: `Only ${allowedTypes.map(
        (type) => type.split("image/")[1]
      )} format allowed.`,
    };

  if (isSizeExceed(size))
    return {
      isValid: false,
      error: `Image size exceeded ${Math.trunc(maxSize / 1000000)}MB`,
    };

  return { isValid: true, error: "" };
}
/**
 * Handle file upload for form fields and generate a preview URL.
 *
 * @param {Event} event - The file input change event.
 * @param {Function} setPreview - State setter for preview URL.
 * @param {Function} onChange - Form data update function (field, file).
 * @param {string} fieldName - Name of the field in formData to update.
 */
function handleFileImgUpload(event, setPreview, onChange, fieldName) {
  //1. get file
  const file = event.target.files[0];
  if (!file) return;

  //2. sanitize filename
  const cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, "_");

  //3. create new File obj

  const editedFile = new File([file], cleanFileName, { type: file.type });

  const previewUrl = URL.createObjectURL(file); // generate preview

  setPreview?.(previewUrl); // update preview state

  //convert file
  onChange(fieldName, editedFile); // update form data
}

/**
 *
 * @param {string} duplicate  - data that duplicate with input
 * @param {string} target  - user input
 * @returns  duplicate === target;
 */
function isDup(duplicate, target) {
  return duplicate === target;
}
/**
 *
 * @param {regex} regex
 * @param {string} target
 * @returns true  or false;
 */
function isValidFormat(regex, target) {
  return regex.test(target);
}
export {
  validImgFile,
  updateFormData,
  handleFileImgUpload,
  isDup,
  isValidFormat,
};
