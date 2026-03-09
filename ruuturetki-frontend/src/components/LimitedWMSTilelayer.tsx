import {
  createLayerComponent,
  LeafletContextInterface,
} from "@react-leaflet/core";
import { WMSTileLayerProps } from "react-leaflet";
import { LimitedWMS } from "../utils/LimitedWMS";

function createLimitedWMS(
  props: WMSTileLayerProps,
  context: LeafletContextInterface,
) {
  // Create the layer
  const layer = new LimitedWMS(props.url, ...[props]);

  return {
    instance: layer,
    context,
  };
}

function updateLimitedWMS(
  layer: L.TileLayer.WMS,
  props: WMSTileLayerProps,
  prevProps: WMSTileLayerProps,
) {
  // Narrow type
  if (props.layers === undefined) {
    throw new Error("Cannot update limited wms layer!");
  }

  // Update when ortolayer name changes (=ortolayer changes)
  if (props.layers !== prevProps.layers) {
    layer.setParams({ layers: props.layers });
  }
}

export const LimitedWMSTileLayer = createLayerComponent<
  L.TileLayer.WMS,
  WMSTileLayerProps
>(createLimitedWMS, updateLimitedWMS);
