type translateObjectType = {
  [key: string]: string;
};

const translateMailErrors: translateObjectType = {
  "The email has already been taken.": "E-mail já utilizado por outra conta.",
  "These credentials do not match our records.":
    "Usuário e/ou senha incorretos",
};

export default {
  //baseURL: "https://pre-pago.portalcrtelecom.com.br",
  //baseURL: "http://192.168.1.107:8000",
  baseURL: "http://localhost:8000",
  ONE_GIGA: 1000000000.0,
  translate: {
    apiErrors: {
      register: {
        email: translateMailErrors,
      },
    },
  },
};
