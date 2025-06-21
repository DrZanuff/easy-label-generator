import * as yup from 'yup'

export const parcelFormSchema = yup.object({
  weight: yup
    .number()
    .typeError('Weight must be a number')
    .positive('Weight must be greater than zero')
    .required('Weight is required'),
  length: yup
    .number()
    .typeError('Length must be a number')
    .positive('Length must be greater than zero')
    .optional(),
  width: yup
    .number()
    .typeError('Width must be a number')
    .positive('Width must be greater than zero')
    .optional(),
  height: yup
    .number()
    .typeError('Height must be a number')
    .positive('Height must be greater than zero')
    .optional(),
})

export type TParcelFormSchema = yup.InferType<typeof parcelFormSchema>
