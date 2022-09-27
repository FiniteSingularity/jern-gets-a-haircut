const NUMPOINTS = 99;

export default class HairFollicle extends Phaser.GameObjects.Rope {
  private _container: Phaser.GameObjects.Container;
  private _points: Phaser.Math.Vector2[] = [];
  private _pointsShown = 0;
  private _pointsTarget = 99;
  private _colors: number[] = [];
  private _wiggleStep = 0;

  constructor(scene, container, x, y) {
    super(scene, x, y, 'rope-hair', null, [], false, []);
    this._container = container;
    this._points = this.randomSprout(NUMPOINTS);
    this._colors = this.getColors(NUMPOINTS);
    this._container.add(this);
  }

  private randomSprout(points: number) {
    const minRadius = 100;
    const maxRadius = 300 + Phaser.Math.Between(-25, 70);
    const angle = Phaser.Math.Angle.Random() / 2.0 + Math.PI / 2.0;
    return [...Array(points).keys()].map(val => {
      const r = (val / (points - 1)) * (maxRadius - minRadius) + minRadius;
      const theta = angle + Phaser.Math.Between(-100, 100)/10000.0;
      return new Phaser.Math.Vector2(r * Math.cos(theta), -r * Math.sin(theta));
    });
  }

  private getColors(points: number) {
    const hsl = Phaser.Display.Color.HSVColorWheel();
    return [...Array(points).keys()].map(val => {
      const index = Math.floor((val / (points - 1)) * 359);
      const hslColor = hsl[index];
      return Phaser.Display.Color.GetColor(hslColor.r, hslColor.g, hslColor.b);
    });
  }

  update() {
    this._wiggleStep += 0.5;
    this._points.forEach((point, i) => {
      point.x += Math.cos(i * 0.5 + this._wiggleStep)
    })
    if(this._pointsShown < this._pointsTarget) {
      this._pointsShown++;
      this.setPoints(this._points.slice(0,this._pointsShown), this._colors.slice(0, this._pointsShown));
    } else {
      this.setDirty();
    }

    
  }
}
