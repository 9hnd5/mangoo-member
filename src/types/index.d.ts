export {};
declare global {
  namespace Express {
    export interface Request {}
    export interface User {
      id: string;
      role: {
        id: number;
        name: string;
      };
    }
  }
}
