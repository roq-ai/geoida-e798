import * as yup from 'yup';

export const clientValidationSchema = yup.object().shape({
  name: yup.string().required(),
  contact_info: yup.string().required(),
  user_id: yup.string().nullable(),
});
