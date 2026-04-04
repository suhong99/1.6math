declare namespace kakao {
  namespace maps {
    function load(callback: () => void): void;

    class LatLng {
      constructor(lat: number, lng: number);
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions);
    }

    interface MarkerOptions {
      map: Map;
      position: LatLng;
    }

    class Marker {
      constructor(options: MarkerOptions);
    }

    interface InfoWindowOptions {
      content: string;
    }

    class InfoWindow {
      constructor(options: InfoWindowOptions);
      open(map: Map, marker: Marker): void;
    }

    namespace services {
      interface AddressSearchResult {
        x: string;
        y: string;
      }

      const Status: {
        OK: string;
        ZERO_RESULT: string;
        ERROR: string;
      };

      class Geocoder {
        addressSearch(
          addr: string,
          callback: (
            result: AddressSearchResult[],
            status: string,
          ) => void,
        ): void;
      }
    }
  }
}

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}
