import type { ReactiveController, ReactiveControllerHost } from 'lit';

export type Reducer<T = unknown> = (state: T, action: Action) => T;
export type Action = { type: string };

export class ReducerController<T = unknown> implements ReactiveController {
  public state: T;

  constructor(
    private host: ReactiveControllerHost,
    public reducer: Reducer<T>,
    public initialState: T,
  ) {
    this.host.addController(this);
    this.state = initialState;
  }

  dispatch(action: Action): void {
    this.state = this.reducer(this.state, action);
    this.host.requestUpdate();
  }
}
