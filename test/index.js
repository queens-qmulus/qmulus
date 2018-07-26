const limit = { code: 422, message: 'Limit must be between 1 and 100.' }
const offset = { code: 422, message: 'Offset must be positive integer.' }
const sort = { code: 422, message: 'Sort length must be greater than 1.' }
const search1 = { code: 422, message: 'Query must be specified.' }
const search2 = { code: 422, message: 'Query length must be more than 2.' }

function getIdError (route, idName) {
  return {
    code: 404,
    message: `${route} with ${idName} 'non-existent-id' does not exist.`,
  }
}

export default { limit, offset, sort, search1, search2, getIdError }
