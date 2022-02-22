module.exports = {
  createResponseError: message => ({
    status: 'error',
    message: message
  })
}
