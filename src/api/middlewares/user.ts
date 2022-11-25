import joi from "joi";

const userCreateValidation = (userCreateDto) => {
  const schema = joi.object({
    login: joi.string().min(6).required(),
    password: joi.string().min(6).alphanum().required(),
    age: joi.number().min(4).max(130),
  });
  return schema.validate(userCreateDto);
};

const validateUser = (req, res, next) => {
  const { error } = userCreateValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

export { validateUser };
