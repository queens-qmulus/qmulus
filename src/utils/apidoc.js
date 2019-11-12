// This file is just used to define a resuable APIDoc snippet.
/**
 * @apiDefine QmulusGETEndpoint
 *
 * @apiParam {string} token API token

 * @apiError 403 Forbidden. API token invalid or missing.
 *   Sign up at [https://manage.qmulus.io/token](https://manage.qmulus.io/token)
 */

/**
 * @apiDefine QmulusLimitOffsetSort
 *
 * @apiParam {number{1-100}} [limit=20] Number of items in the response
 * @apiParam {number} [offset]
 *   Used in conjuction with `limit` to fetch paginated results
 * @apiParam {string} [sort] Sorting string query (used by mongo)
 */
