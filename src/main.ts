declare global {
  interface Atomics {
    waitAsync(typedArray: Int32Array, index: number, value: number, timeout?: number): {value: Promise<any>}
  }
}

function acquireLock(lock: Int32Array, index: number) {
  Atomics.wait(lock, index, 1)
  Atomics.store(lock, index, 1)
}

function releaseLock(lock: Int32Array, index: number) {
  Atomics.store(lock, index, 0)
  Atomics.notify(lock, index, 1)
}

export function acquireReadLock(lock: Int32Array) {
  acquireLock(lock, 1)
  if(Atomics.add(lock, 0, 1) === 1) {
    acquireLock(lock, 2)
  }
  releaseLock(lock, 1)
}

export function releaseReadLock(lock: Int32Array) {
  if(Atomics.add(lock, 0, -1) === 0) {
    releaseLock(lock, 2)
  }
}

export function acquireWriteLock(lock: Int32Array) {
  acquireLock(lock, 2)
}

export function releaseWriteLock(lock: Int32Array) {
  releaseLock(lock, 2)
}

async function acquireLockAsync(lock: Int32Array, index: number) {
  await Atomics.waitAsync(lock, index, 1).value
  Atomics.store(lock, index, 1)
}

export async function acquireReadLockAsync(lock: Int32Array) {
  await acquireLockAsync(lock, 1)
  if(Atomics.add(lock, 0, 1) === 1) {
    await acquireLockAsync(lock, 2)
  }
  releaseLock(lock, 1)
}

export async function acquireWriteLockAsync(lock: Int32Array) {
  await acquireLockAsync(lock, 2)
}
