import { emailPattern } from "./InputRules";
import { PasswordRulesSet } from './constant';

export const SignupFields = [
  {
    type: "input",
    name: "first_name",
    fieldtype: "text",
    label: "First Name",
    placeholder: "Enter your first name",
    inputRules: {
      required: "First name is required",
      pattern:{
        value:/^[A-Za-z\s]+$/i,
        message:"Only alphabets are allowed"
      }
    },
    size: true,
  },
  {
    type: "input",
    name: "last_name",
    fieldtype: "text",
    label: "Last Name",
    placeholder: "Enter your last name",
    inputRules: {
      required: "Last name is required",
      pattern:{
        value:/^[A-Za-z\s]+$/i,
        message:"Only alphabets are allowed"
      }
    },
    size: true,
  },
  {
    type: "input",
    name: "email",
    fieldtype: "email",
    label: "Email",
    placeholder: "Enter your email",
    inputRules: {
      required: "Email is required",
      pattern: {
        value: emailPattern,
        message: "Invalid email address",
      },
    },
    size: false,
  },
  {
    type: "input",
    name: "password",
    fieldtype: "password",
    label: "Password",
    placeholder: "Enter your password",
    inputRules: {
      required: "Password is required",
    },
    size: false,
  }
];

export const LoginFields = [
  {
    type: "input",
    name: "email",
    fieldtype: "email",
    label: "Email",
    placeholder: "Enter your email",
    inputRules: {
      required: "Email is required",
      pattern: {
        value: emailPattern,
        message: "Invalid email address",
      },
    },
  },
  {
    type: "input",
    name: "password",
    fieldtype: "password",
    label: "Password",
    placeholder: "Enter your password",
    inputRules: {
      required: "Password is required",
    },
  },
];

export const PasswordRules = [
  {
    name : 'Contains at least 8 characters',
    key: PasswordRulesSet.character
  },
  {
    name : 'Contains both lower (a-z) and upper case letters(A-Z)',
    key: PasswordRulesSet.upperlowercase
  },
  {
    name : 'Contains at least one number (0-9) or a symbol',
    key: PasswordRulesSet.number
  },
  {
    name : 'Does not contain your email address',
    key: PasswordRulesSet.email
  },
  {
    name : 'Is not commonly used',
    key: PasswordRulesSet.common
  }
]
