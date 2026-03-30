import { useState } from 'react'

export function useFormValidation(initial, validator) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = validator(values)
    setErrors(next)
    return Object.values(next).every((v) => !v)
  }

  return {
    values,
    errors,
    setField: (key, value) => setValues((prev) => ({ ...prev, [key]: value })),
    setValues,
    validate,
  }
}
