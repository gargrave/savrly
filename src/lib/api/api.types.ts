// error: {
// 	code: '23502', // "not_null_violation"
// 	details: 'Failing row contains (3, , null, 2023-05-15 02:28:03.180476+00, 2023-05-15 02:28:03.180476).',
// 	hint: null,
// 	message: 'null value in column "url" of relation "bookmarks" violates not-null constraint'
// }
export interface PostgreSqlError {
  code: string;
  details: string;
  hint: string | null;
  message: string;
}

export interface ApiResource {
  created: string;
  id: string;
  updated: string;
}
