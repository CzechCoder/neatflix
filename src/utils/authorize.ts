import { userObject } from "../data/user-object";

export const authorize = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (email === "john@gmail.com") {
    if (password === "1234") return { message: "authorized", user: userObject };
    else {
      return { message: "Email and password don't match!" };
    }
  } else {
    return {
      message: "Sorry, we can't find an account with this email address!",
    };
  }
};
