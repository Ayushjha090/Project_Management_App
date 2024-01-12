const yup = require("yup");
const User = require("../models/User");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerUserSchema = yup
  .object({
    firstName: yup
      .string()
      .trim()
      .min(3)
      .max(100)
      .required("Kindly provide your First Name as it is a required field."),
    lastName: yup
      .string()
      .trim()
      .min(3)
      .max(100)
      .required("Kindly provide your Last Name as it is a required field."),
    email: yup
      .string()
      .required("Kindly provide your email as it is a required field.")
      .email("Invalid email format")
      .test("is-unique-email", "Email already exists", async function (value) {
        const existingUser = await User.findOne({ email: value });
        return !existingUser;
      }),
    contact: yup
      .string()
      .min(6)
      .max(15)
      .required(
        "Kindly provide your contact details as it is a required field."
      )
      .test(
        "is-unique-contact",
        "Contact number already exists",
        async function (value) {
          const existingUser = await User.findOne({ contact: value });
          return !existingUser;
        }
      ),
    password: yup
      .string()
      .matches(
        passwordRegex,
        "Password must contain at least one upper case letter, one lower case letter, one number, and one special character."
      ),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "confirmPassword doesn't match the password"
      ),
    organizationName: yup.string().optional().trim(),
  })
  .required();

const generateOtpSchema = yup.object({
  email: yup
    .string()
    .required("Kindly provide your email as it is a required field.")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Kindly provide your password as it is a required field."),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Kindly provide your email as it is a required field.")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Kindly provide your password as it is a required field."),
  oneTimePassword: yup
    .string()
    .required("One Time Password is a required field."),
});

module.exports = { registerUserSchema, generateOtpSchema, loginSchema };
