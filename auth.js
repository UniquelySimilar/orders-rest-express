var checkAuthHeader = function(req, res, next) {
  let headerValue = req.header('Authorization');
  if (headerValue === undefined) {
    res.sendStatus(401);
  }
  else {
    let token = headerValue.substring(7);
    //  TODO: Query tokenusersexpress table for token.
    //  - If NOT found, respond with 401
    //  - If found, check expiration date
    //    * If NOT expired, call next()
    //    * If expired, respond with 401
  }

  next();
}

export { checkAuthHeader };