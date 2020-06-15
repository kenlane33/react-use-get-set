import { makeFuncForEachInHash, forEachInHash } from '../helpers/iterators.js'



describe('makeFuncForEachInHash', () => {
  
  const obj = { hash: { fun: 4, sun: 2 } }
  let checkKeys = []
  let checkVals = []
  let yuckLog = ""

  makeFuncForEachInHash( obj, obj.hash, 'enjoy', (k,v) => {
    checkKeys.push(k)
    checkVals.push(v)
    return () => { yuckLog += k + v }
  })

  test('Iterates all', () => {
    expect(checkKeys).toEqual([ 'fun', 'sun' ]);
    expect(checkVals).toEqual([     4,     2 ]);
  })

  test('can call funcs', () => {
    obj.enjoy.fun()
    expect(yuckLog).toEqual( 'fun4' )
    obj.enjoy.sun()
    expect(yuckLog).toEqual('fun4sun2')
  })

})

describe('Test forEachInHash', () => {
  const obj={fun:4,sun:2}
  forEachInHash( obj, ([k,v])=> obj[k] = v+1 )

  test('Runs func on each', () => {
    expect(obj).toEqual({fun:5,sun:3});
  })

})