import type { ReactiveController, ReactiveControllerHost } from 'lit';

export type Reducer<T, A> = (state: T, action: A) => T;

export class ReducerController<T = unknown, A = unknown> implements ReactiveController {
  public state: T;

  constructor(
    private host: ReactiveControllerHost,
    public reducer: Reducer<T, A>,
    public initialState: T,
  ) {
    this.host.addController(this);
    this.state = initialState;
  }

  dispatch(action: A): void {
    this.state = this.reducer(this.state, action);
    this.host.requestUpdate();
  }

  hostUpdate?():void
}
