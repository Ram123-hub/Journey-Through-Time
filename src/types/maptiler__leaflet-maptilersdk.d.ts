declare module '@maptiler/leaflet-maptilersdk' {
    import * as L from 'leaflet';
  
    interface MaptilerLayerOptions extends L.TileLayerOptions {
      apiKey: string;
    }
  
    export class MaptilerLayer extends L.TileLayer {
      constructor(options: MaptilerLayerOptions);
    }
  }
  