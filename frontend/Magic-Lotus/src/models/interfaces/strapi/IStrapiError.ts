export default interface IStrapiError {
  data: null;
  error: {
    status: number; // HTTP status
    name: string; // Strapi error name ('ApplicationError' or 'ValidationError')
    message: string; // A human readable error message
    details: Object; // error info specific to the error type
  };
}
