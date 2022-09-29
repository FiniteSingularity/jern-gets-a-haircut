import { BehaviorSubject } from "rxjs";

export interface Score {
  hits: number;
  secondsElapsed: number;
}

class ScoreService {
  hits = 0;
  secondsElapsed = 0;
  // timer = timer(1000, 1000).subscribe((time) => {
  //   this.setSecondsElapsed(time/1000);
  // });
  private _score = new BehaviorSubject<Score>({
    hits: 0,
    secondsElapsed: 0
  });

  constructor() {
  }

  get score$() {
    return this._score.asObservable();
  }

  resetScore() {
    this.hits = 0;
    this.secondsElapsed = 0;
    this._score.next({
      hits: 0,
      secondsElapsed: 0
    });
  }

  incrementHit(hitCount: number) {
    console.log(hitCount);
    this.hits += hitCount;
    console.log(this.hits);
    this._score.next({
      hits: this.hits,
      secondsElapsed: this.secondsElapsed
    });
  }

  incrementSecondsElapsed(time: number) {
    this.secondsElapsed += time;
    this._score.next({
      hits: this.hits,
      secondsElapsed: this.secondsElapsed,
    });
  }
}

export default new ScoreService();
