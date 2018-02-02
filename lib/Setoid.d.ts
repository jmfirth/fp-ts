/** @typeclass */
export interface Setoid<A> {
    equals: (x: A, y: A) => boolean;
}
/** @function */
export declare const strictEqual: (a: any, b: any) => boolean;
/** @instance */
export declare const setoidString: Setoid<string>;
/** @instance */
export declare const setoidNumber: Setoid<number>;
/** @instance */
export declare const setoidBoolean: Setoid<boolean>;
/** @function */
export declare const getArraySetoid: <A>(S: Setoid<A>) => Setoid<A[]>;
/** @function */
export declare const getRecordSetoid: <O extends {
    [key: string]: any;
}>(setoids: { [K in keyof O]: Setoid<O[K]>; }) => Setoid<O>;
/** @function */
export declare const getProductSetoid: <A, B>(SA: Setoid<A>, SB: Setoid<B>) => Setoid<[A, B]>;
