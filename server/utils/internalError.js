const internalErr = (res, err) => {
  console.log(err);
  res.status(500).send("Internal server error");
};

module.exports = internalErr;
