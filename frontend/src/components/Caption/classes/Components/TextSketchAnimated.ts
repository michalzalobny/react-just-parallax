import { TextSketch } from './TextSketch';

interface Constructor {
  text: string;
  ctx: CanvasRenderingContext2D | null;
}

export class TextSketchAnimated extends TextSketch {
  constructor({ text, ctx }: Constructor) {
    super({ ctx, text });
  }
}
