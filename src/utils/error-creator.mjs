export const /*loginError*/ resError = (error = []) => {
    // loginError is the previous function name
    const errorMsg = {}; // The error message will be created as an object.

    for (const e of error) {
      if (errorMsg[e.path] !== undefined) {
        const msg = `${errorMsg[e.path]}, ${e.msg}`;
        errorMsg[e.path] = msg;
      } else {
        errorMsg[e.path] = e.msg;
      }
    }

    return errorMsg;
  };
