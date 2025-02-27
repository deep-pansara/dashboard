import React from 'react'
import {Form, Input, Select, SelectItem, Checkbox, Button} from "@heroui/react";

const Insurance = () => {

  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  // Real-time password validation
  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    if (data.terms !== "true") {
      setErrors({terms: "Please accept the terms"});

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };




  return (
    <>
    insurance
    
    </>
  )
}

export default Insurance