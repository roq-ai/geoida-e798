import * as yup from 'yup';

export const lendingValidationSchema = yup.object().shape({
  lending_date: yup.date().required(),
  return_date: yup.date(),
  equipment_id: yup.string().nullable(),
  client_id: yup.string().nullable(),
});
