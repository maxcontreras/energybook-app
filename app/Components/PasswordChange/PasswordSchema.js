import * as yup from 'yup';
export const validationSchema = yup.object({
  actualPassword: yup
    .string()
    .required('Necesitaras otra contraseña!')
    .min(5, 'Tu contraseña parece un poco corta'),
  newPassword: yup
    .string()
    .required('Confirma tu contraseña!')
    .test('passwords-match', 'Las contraseñas deben coincidir', function(
      value,
    ) {
      return this.parent.actualPassword === value;
    }),
});
