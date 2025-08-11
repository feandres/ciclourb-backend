import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  getAllLayers() {
    return {
      CONTIDO_GEOJSON: this.load('CONTIDO_GEOJSON.geojson'),
      EXECUTADO_GEOJSON: this.load('EXECUTADO_GEOJSON.geojson'),
      EXISTENTE_GEOJSON: this.load('EXISTENTE_GEOJSON.geojson'),
      NAOCONTIDO_GEOJSON: this.load('NAOCONTIDO_GEOJSON.geojson'),
      NAOEXECUTADO_GEOJSON: this.load('NAOEXECUTADO_GEOJSON.geojson'),
    };
  }

  private load(file: string) {
    const filePath = path.join(process.cwd(), 'data', file);
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  }
}
