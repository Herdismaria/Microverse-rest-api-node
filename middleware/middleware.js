exports.notFound = (req, res, next) => {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
}

exports.errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // if invalid _id is entered then a cast error occurs
  if (err.name === "CastError") {
    err.status = 404;
    err.message = "Not found";
  }
  // send the error
  res.status(err.status || 500);
  res.send(err.message);
};
