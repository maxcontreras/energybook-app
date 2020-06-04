import * as yup from 'yup';
export const validationSchema = yup.object({
  name: yup.string().required('Nombre necesario'),
  lastname: yup.string().required('Apellido necesario'),
  email: yup
    .string()
    .required('Favor de introducir tu correo electronico')
    .email('Tu correo debe de ser valido! '),
  password: yup
    .string()
    .required('Necesitaras una contraseña!')
    .min(5, 'Tu contraseña parece un poco corta'),
  confirmPassword: yup
    .string()
    .required('Confirmar la contraseña es necesario.')
    .test('passwords-match', 'Las contraseñas deben coincidir', function(
      value,
    ) {
      return this.parent.password === value;
    }),
  company: yup
    .string()
    .required('Porfavor, introduce el nombre de tu compañia'),
  phone: yup.string().required('Telefono Necesario'),
});
