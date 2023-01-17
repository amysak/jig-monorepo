import { HttpError } from "type-defs";

const isHttpError = (error: any): error is HttpError => {
  return !!(
    Array.isArray((error as HttpError).message) &&
    (error as HttpError).timestamp
  );
};

const isMessagedError = (error: any): error is { message: string } => {
  return !!error.message;
};

export const formatError = (error: unknown) => {
  if (!error || !(error as any).message) {
    const errorText = "Unknown error occured...";
    console.warn(errorText);
    return errorText;
  }
  if (isHttpError(error)) {
    console.log("error.message => ", (error as any).message);
    return (error as HttpError).message?.join("\n");
  } else if (isMessagedError(error)) {
    return error.message;
  }

  return "Unknown error";
};
