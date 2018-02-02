import { HKT, URIS, URIS2, Type, Type2 } from './HKT';
import { Applicative } from './Applicative';
import { Lazy } from './function';
import { Monad } from './Monad';
/**
 * Log any value to the console for debugging purposes and then
 * return a value. This will log the value's underlying representation for
 * low-level debugging
 * @function
 */
export declare const trace: <A>(message: any, out: Lazy<A>) => A;
/**
 * Log any value and return it
 * @function
 */
export declare const spy: <A>(a: A) => A;
/**
 * Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`
 */
export declare function traceA<F extends URIS2>(F: Applicative<F>): <L>(message: any) => Type2<F, L, void>;
export declare function traceA<F extends URIS>(F: Applicative<F>): (message: any) => Type<F, void>;
export declare function traceA<F>(F: Applicative<F>): (message: any) => HKT<F, void>;
/**
 * Log any value to the console and return it in `Monad` useful when one has monadic chains
 */
export declare function traceM<F extends URIS2>(F: Monad<F>): <L, A>(a: A) => Type2<F, L, A>;
export declare function traceM<F extends URIS>(F: Monad<F>): <A>(a: A) => Type<F, A>;
