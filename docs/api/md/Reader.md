MODULE [Reader](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts)

# Reader

_data_

```ts
constructor(readonly run: (e: E) => A) {}
```

## Methods

### ap

```ts
<B>(fab: Reader<E, (a: A) => B>): Reader<E, B>
```

### ap_

```ts
<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C>
```

### chain

```ts
<B>(f: (a: A) => Reader<E, B>): Reader<E, B>
```

### map

```ts
<B>(f: (a: A) => B): Reader<E, B>
```

# reader

_instance_

```ts
Monad<URI>
```

# ap

_function_

```ts
<E, A, B>(fab: Reader<E, (a: A) => B>, fa: Reader<E, A>): Reader<E, B>
```

# ask

_function_

```ts
<E>(): Reader<E, E>
```

reads the current context

# asks

_function_

```ts
<E, A>(f: (e: E) => A): Reader<E, A>
```

Projects a value from the global context in a Reader

# chain

_function_

```ts
<E, A, B>(f: (a: A) => Reader<E, B>, fa: Reader<E, A>): Reader<E, B>
```

# local

_function_

```ts
<E>(f: (e: E) => E) => <A>(fa: Reader<E, A>): Reader<E, A>
```

changes the value of the local context during the execution of the action `fa`

# map

_function_

```ts
<E, A, B>(f: (a: A) => B, fa: Reader<E, A>): Reader<E, B>
```

# of

_function_

```ts
<E, A>(a: A): Reader<E, A>
```
