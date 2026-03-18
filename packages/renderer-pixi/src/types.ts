export type ConcreteConstructor<T>=new(...args:any[])=>T;
export type AbstractConstructor<T>=abstract new(...args:any[])=>T;
export type Constructor<T>=ConcreteConstructor<T>|AbstractConstructor<T>;
