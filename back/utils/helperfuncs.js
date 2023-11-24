const isEmpty = (object) => {
  if (object == null) {
    return true
  }
  return Object.keys(object).length===0
}

module.exports = { isEmpty }