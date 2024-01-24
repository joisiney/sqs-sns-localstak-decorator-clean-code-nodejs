export namespace ISQSService {
  export interface CreateInput {
    message: string;
    attributes: object;
  }
  export interface Implements {
    createQueue(): Promise<boolean>;
    recoverUrlQueue(): Promise<string | undefined>;
    hasQueue(): Promise<boolean>;
    dispatchMessage(props: CreateInput): Promise<boolean>;
  }
}
