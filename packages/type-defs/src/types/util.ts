export type ProtoExtends<T, U> = U & Omit<T, keyof U>;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type ObjectValues<T> = T[keyof T];
