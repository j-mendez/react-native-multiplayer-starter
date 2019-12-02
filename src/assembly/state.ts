'use strict';

class State {
  constructor(
    private scene: string,
    private hp: i32,
    private attack: boolean,
    private color: string,
    private kills: i32,
    private _translateX: i32,
    private _translateY: i32,
  ) {}
}

export {State};
