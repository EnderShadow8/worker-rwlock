# worker-rwlock

## Usage

```js
const {
  acquireReadLock,
  releaseReadLock,
  acquireWriteLock,
  releaseWriteLock,
  acquireReadLockAsync,
  acquireWriteLockAsync
} = require("worker-rwlock")
// or
import {
  acquireReadLock,
  releaseReadLock,
  acquireWriteLock,
  releaseWriteLock,
  acquireReadLockAsync,
  acquireWriteLockAsync
} from "worker-rwlock"

// Must be at least 12 bytes long
const lock = Int32Array(SharedArrayBuffer(12))

// Multiple threads can hold read locks at one time
// Note: This cannot enforce the thread to only read the data

acquireReadLock(lock)
// Read the data
releaseReadLock(lock)

// Write locks are exclusive: if a thread has a write lock then no other
// thread can access the data at all

acquireWriteLock(lock)
// Write the data
releaseWriteLock(lock)

// Async versions are also available for V8 only

await acquireReadLockAsync(lock)
// Read the data
releaseReadLock(lock)

await acquireWriteLockAsync(lock)
// Write the data
releaseWriteLock(lock)

// More information: https://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock
```
