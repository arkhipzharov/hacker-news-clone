/*
  Element implicitly has an 'any' type because expression of type 'string' can't
  be used to index type 'Global'.
  No index signature with a parameter of type 'string' was found on type 'Global'

  global[name] = globals[name]
*/
declare namespace NodeJS {
  export interface Global {
    // helpers. They are will be available with global.h.helperFunction()
    h: {
      [key: string]: Function;
    };
  }
}
