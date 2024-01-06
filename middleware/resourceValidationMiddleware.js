/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a yup schema
 */

const resourceValidationMiddleware =
  (resourceSchema) => async (req, res, next) => {
    const { body } = req;
    try {
      await resourceSchema.validate(body);
      next();
    } catch (error) {
      return res.status(400).json({ errors: error.errors });
    }
  };

module.exports = resourceValidationMiddleware;
