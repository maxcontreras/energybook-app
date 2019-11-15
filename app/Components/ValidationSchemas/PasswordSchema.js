import * as yup from "yup";
export const validationSchema = yup.object({
  oldPassword: yup.string().required("Necesitaras tu contraseña actual!"),
  actualPassword: yup
    .string()
    .required("Necesitaras otra contraseña!")
    .min(5, "Tu contraseña parece un poco corta"),
  newPassword: yup
    .string()
    .required()
    .test("passwords-match", "Las contraseñas deben coincidir", function(
      value
    ) {
      return this.parent.newPassword === value;
    })
});
