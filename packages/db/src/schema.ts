import * as users  from "./schemas/users";
import * as example  from "./schemas/example";

export const schema = { ...users, ...example };

// export schema type
export type { InsertUser, SelectUser } from "./schemas/users";