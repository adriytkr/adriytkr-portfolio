export type ComponentType<T>=(
  new(...args:any[])=>T)|
  (abstract new(...args:any[])=>T
);

export abstract class Component{}
