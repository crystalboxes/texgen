import seedrandom from 'seedrandom'
import API from './API.js'

class Random {
  constructor(seed, numbersToAllocate) {
    this.construct(seed, numbersToAllocate)
  }

  construct(seed, numbersToAllocate) {
    if (seed == null) {
      seed = 9909
    }
    if (seed < 1) {
      seed = Math.floor(seed * 1000)
    }
    this.seed = seed
    if (numbersToAllocate == null) {
      numbersToAllocate = 0
    }
    this.rng = seedrandom(this.seed)
    this.current = 0
    this.allocated = []
  }

  allocate(num) {
    for (let x = 0; x < num; x++) {
      this.allocated.push(this.rng())
    }
  }

  init(seed, numbersToAllocate) {
    if (seed == this.seed) {
      this.current = 0
    } else {
      this.construct(seed, numbersToAllocate)
    }
  }

  next() {
    if (this.current >= this.allocated.length) {
      this.allocate(10000)
    }
    return this.allocated[this.current++]
  }

  range(min, max) {
    if (max == null) {
      max = min
      min = 0
    }
    return API.Map(this.next(), 0, 1, min, max)
  }

  rng = seedrandom(0)
  allocated = []
  current = 0

}

export default Random