import { IO } from './IO';
import { Option } from './Option';
import { Either } from './Either';
/**
 * Create a JavaScript error, specifying a message
 * @function
 */
export declare const error: (message: string) => Error;
/**
 * Get the error message from a JavaScript error
 * @function
 */
export declare const message: (e: Error) => string;
/**
 * Get the stack trace from a JavaScript error
 * @function
 */
export declare const stack: (e: Error) => Option<string>;
/**
 * Throw an exception
 * @function
 */
export declare const throwError: <A>(e: Error) => IO<A>;
/**
 * Catch an exception by providing an exception handler
 * @function
 */
export declare const catchError: <A>(ma: IO<A>, handler: (e: Error) => IO<A>) => IO<A>;
/**
 * Runs an IO and returns eventual Exceptions as a `Left` value. If the
 * computation succeeds the result gets wrapped in a `Right`.
 * @function
 */
export declare const tryCatch: <A>(ma: IO<A>) => IO<Either<Error, A>>;
