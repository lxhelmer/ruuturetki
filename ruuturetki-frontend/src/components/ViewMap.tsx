import { MapContainer, WMSTileLayer, Marker, Popup } from 'react-leaflet'
import MapComponents from './MapComponents.tsx'
import { useState, useEffect } from 'react'
import type { GameState } from './Game.tsx'
import { GameSettings } from '../types.ts'
import markerIcon from './MarkerIcon.tsx'

function OrtoLayer({ map, start_pos, renderKey }:
  {
    map: string,
    start_pos: L.LatLng,
    renderKey: number,
  }) {
  const bounds = start_pos.toBounds(4000)
  const wmsOptions: L.WMSOptions = {
    version: '1.1.1.1',
    layers: map,
    format: 'image/png',
    transparent: false,
    bounds: bounds,
  }

  return (
    <WMSTileLayer
      key={renderKey}
      url="https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
      attribution={'&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>'}
      {...wmsOptions}
    />
  )
}

function ViewMap(
  {
    start_pos,
    pick_score,
    setPos,
    setPickScore,
    random_latlng,
    gameState,
    setGameState,
    maxDist,
    setDist,
    picker_pos,
    gameSettings
  }:
    {
      start_pos: L.LatLng,
      pick_score: number,
      setPos: Function,
      setPickScore: Function,
      random_latlng: Function,
      gameState: GameState,
      setGameState: Function,
      maxDist: number,
      setDist: Function,
      picker_pos: L.LatLng | null,
      gameSettings: GameSettings
    }) {
  const move_bounds: L.LatLngBounds = start_pos.toBounds(3800)
  const mapOptions: L.MapOptions = {
    center: start_pos,
    zoom: 17,
    scrollWheelZoom: false,
    maxBounds: move_bounds,
    maxBoundsViscosity: 0.9,
    zoomControl: false,
    boxZoom: false,
    doubleClickZoom: false,
  };

  const [renderKey, setKey] = useState(1)

  //key trick for forcing rerender on the WMS layer
  useEffect(() => {
    setKey(prevKey => prevKey + 1)
  }, [start_pos])

  return (
    <>
      <MapContainer id="map" {...mapOptions} key={renderKey}>
        <OrtoLayer map={gameSettings.map} start_pos={start_pos} renderKey={renderKey} />
        <Marker position={start_pos} icon={markerIcon}>
          <Popup>
            Try to match this position!
          </Popup>
        </Marker>

        <MapComponents
          start_pos={start_pos}
          pick_score={pick_score}
          setPos={setPos}
          setPickScore={setPickScore}
          random_latlng={random_latlng}
          gameState={gameState}
          setGameState={setGameState}
          maxDist={maxDist}
          setDist={setDist}
          picker_pos={picker_pos}
          gameSettings={gameSettings}
        />
      </MapContainer>
    </>
  )
}

export default ViewMap