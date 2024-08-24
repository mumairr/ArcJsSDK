import { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Search from "@arcgis/core/widgets/Search";
import LayerList from "@arcgis/core/widgets/LayerList";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import Measurement from "@arcgis/core/widgets/Measurement";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRuler,
  faDrawPolygon,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button, theme, ConfigProvider, Space, Tooltip, Slider, Card } from "antd";
import "antd/dist/reset.css";
import "./Map.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const { defaultAlgorithm, darkAlgorithm } = theme;

const MapComponent = () => {
  const mapDiv = useRef(null);
  const featureLayerRef = useRef(null); // Ref for the feature layer
  const [measurementWidget, setMeasurementWidget] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [populationRange, setPopulationRange] = useState([0, 300000]); // Default population range

  const basemaps = {
    true: "dark-gray-vector",
    false: "gray-vector",
  };

  const modeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Function to handle population range change
  const handlePopulationChange = (value) => {
    setPopulationRange(value);

    // Update the filter directly on the feature layer
    if (featureLayerRef.current) {
      featureLayerRef.current.definitionExpression = `POP2000 >= ${value[0]} AND POP2000 <= ${value[1]}`;
    }
  };

  // Function to switch between light and dark Esri themes
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    const sheet = document.getElementById("esri-theme-link");

    if (!sheet) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = "esri-theme-link";
      link.href = isDarkMode
        ? "https://js.arcgis.com/4.22/esri/themes/dark/main.css"
        : "https://js.arcgis.com/4.22/esri/themes/light/main.css";
      document.head.appendChild(link);
    } else {
      sheet.href = isDarkMode
        ? "https://js.arcgis.com/4.22/esri/themes/dark/main.css"
        : "https://js.arcgis.com/4.22/esri/themes/light/main.css";
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (mapDiv.current) {
      // Initialize the WebMap with the selected basemap (dark or light)
      const webmap = new WebMap({
        basemap: basemaps[isDarkMode],
      });

      // Add layers to the map
      const wmsLayer = new WMSLayer({
        url: "http://localhost/geoserver/wms",
        sublayers: [
          {
            name: "ne:world",
            visible: false,
            title: "Countries",
          },
        ],
        format: "png",
        opacity: 0.7,
        title: "GeoServer World Layer",
      });

      const featureLayer = new FeatureLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
        visible: true,
        title: "USA Population Layer",
        definitionExpression: `POP2000 >= ${populationRange[0]} AND POP2000 <= ${populationRange[1]}`, // Initial population filter
      });

      featureLayer.renderer = {
        type: "simple",
        symbol: {
          type: "simple-marker",
          size: 10,
          color: "white",
        },
      };

      featureLayer.popupTemplate = {
        content: "Name: {areaname} has a population of {pop2000} people.",
      };

      featureLayerRef.current = featureLayer; // Store the reference to the feature layer

      const overlayGroupLayer = new GroupLayer({
        title: "Overlays",
        layers: [wmsLayer, featureLayer],
        visibilityMode: "independent",
        opacity: 1,
      });

      webmap.add(overlayGroupLayer);

      // Create the MapView
      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        center: [0, 0],
        scale: 50000000,
      });

      // Add widgets to the map
      const searchWidget = new Search({
        view: view,
        allPlaceholder: "Search for a location",
      });
      view.ui.add(searchWidget, {
        position: "top-left",
        index: 0,
      });

      const layerList = new LayerList({
        view: view,
      });
      view.ui.add(layerList, {
        position: "top-right",
      });

      const measurement = new Measurement({
        view: view,
      });
      setMeasurementWidget(measurement);

      const scaleBar = new ScaleBar({
        view: view,
        unit: "metric",
      });
      view.ui.add(scaleBar, {
        position: "bottom-right",
      });

      const coordinateConversion = new CoordinateConversion({
        view: view,
      });
      view.ui.add(coordinateConversion, {
        position: "bottom-right",
      });

      // Add hover effect for cursor pointer
      view.on("pointer-move", (event) => {
        view.hitTest(event).then((response) => {
          const results = response.results;
          if (results.length > 0 && results[0].graphic.layer === featureLayer) {
            view.container.style.cursor = "pointer";
          } else {
            view.container.style.cursor = "default";
          }
        });
      });

      return () => {
        if (view) {
          view.destroy();
        }
      };
    }
  }, [mapDiv, isDarkMode]);

  // Activate the measurement tool
  const activateMeasurementTool = (tool) => {
    if (measurementWidget) {
      measurementWidget.activeTool = tool;
      measurementWidget.view.ui.add(measurementWidget, "bottom-left");
    }
  };

  // Clear the measurement tool
  const clearMeasurement = () => {
    if (measurementWidget) {
      measurementWidget.clear();
      measurementWidget.view.ui.remove(measurementWidget);
    }
  };

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <div className="mapDiv" ref={mapDiv}></div>

        {/* Theme switch and buttons */}
        <div
          className="measurement-buttons"
          style={{ position: "absolute", bottom: "60px", right: "10px" }}
        >
          <Space direction="vertical">
            <Tooltip title="Toggle Dark Mode">
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={modeChange}
                size={30}
              />
            </Tooltip>
            <Tooltip title="Measure Distance">
              <Button
                type="default"
                icon={<FontAwesomeIcon icon={faRuler} />}
                onClick={() => activateMeasurementTool("distance")}
              ></Button>
            </Tooltip>
            <Tooltip title="Measure Area">
              <Button
                type="default"
                icon={<FontAwesomeIcon icon={faDrawPolygon} />}
                onClick={() => activateMeasurementTool("area")}
              ></Button>
            </Tooltip>
            <Tooltip title="Clear Measurement">
              <Button
                type="default"
                icon={<FontAwesomeIcon icon={faTrashAlt} />}
                onClick={clearMeasurement}
              ></Button>
            </Tooltip>
          </Space>
        </div>

        {/* Population Range Slider */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "10px",
            width: "250px",
          }}
        >
          <Card
            title="Filter Population Feature"
            bordered
          >
            <Slider
              range
              min={0}
              max={300000}
              defaultValue={[0, 300000]}
              step={1000}
              tooltip={{ open: false }}
              onChange={handlePopulationChange}
              marks={{
                0: "0",
                50000: "50K",
                100000: "100K",
                300000: "300K",
              }}
            />
          </Card>
        </div>
      </ConfigProvider>
    </>
  );
};

export default MapComponent;
