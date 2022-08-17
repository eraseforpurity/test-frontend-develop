import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  authorEmail: Yup.string().email('Invalid email').required('Required'),
  description: Yup.string().max(500, 'Maximum 500 charaters'),
  name: Yup.string()
    .min(3, 'Minimal 3 charaters')
    .max(50, 'Maximum 50 charaters')
    .required('Required'),
  price: Yup.number()
    .max(1000, 'Max price is 1000')
    .min(0, 'Min price is 0')
    .integer('Must be integer')
    .required('enter a number'),
  trackLength: Yup.number()
    .max(300, 'Max trackLength is 1000')
    .min(0, 'Min trackLength is 0')
    .integer('Must be integer')
    .required('enter a number')
});
