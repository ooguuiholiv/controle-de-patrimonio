const validateName = (name) => {
  const nameRegex = new RegExp(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/);
  return nameRegex.test(name);
};

const validateEmail = (email) => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  );
  return passwordRegex.test(password);
};

const validatePlate = (plate) => {
  const plateRegex = new RegExp(
    /^[A-Z]{3}-\d{4}$/
  )
  return plateRegex.test(plate);
};

const validatePlateMercosul = (plate) => {
  const plateRegexMerco = new RegExp(
     /^[A-Z]{3}\d[A-Z]\d{2}$/
  );
  return plateRegexMerco.test(plate)
}

module.exports = { validateName, validateEmail, validatePassword, validatePlate, validatePlateMercosul };
