Here's an updated version of your **README** with an enhanced structure, better formatting, and more detailed sections. The shapefile upload feature has also been incorporated into this version.

---

# ArcGIS JavaScript SDK Proof of Concept (POC)

Welcome to the **ArcGIS JavaScript SDK POC** repository! This project showcases how to integrate the **ArcGIS JavaScript SDK** into a **React** application to build powerful and interactive geospatial tools.

### 🌍 [Live Demo](https://esri-javascript-sdk-poc.web.app/)

---

## 🛠️ Features

- **Interactive Map Rendering**: Dynamic map visualization using the ArcGIS JavaScript SDK.
- **WMS Layer Support**: Integration with GeoServer via Web Map Service (WMS) layers.
- **Feature Layer with Filtering**: Display feature layers with filtering functionality (e.g., population data).
- **Widgets**:
  - **Search Widget**: Perform location searches on the map.
  - **Layer List Widget**: Toggle layers visibility and control settings.
  - **Measurement Tools**: Measure distance and area on the map.
  - **Coordinate Conversion**: Show real-time mouse pointer coordinates in various formats.
- **Dark/Light Mode**: Switch between dark and light themes dynamically.
- **Shapefile Upload**: Upload and display custom GIS data using shapefiles.
- **Population Filtering**: Adjust feature layer content dynamically based on population attributes using a slider.

---

## 📖 Table of Contents

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Components](#components)
5. [Shapefile Upload](#shapefile-upload)
6. [Contributing](#contributing)
7. [License](#license)

---

## 🚀 Getting Started

This guide will help you set up the project on your local machine and start exploring the ArcGIS SDK features within a React-based web application.

### Prerequisites

- **Node.js** and **npm** (or **yarn**) must be installed.
- Optionally, an **ArcGIS Developer Account** for accessing additional ArcGIS services.

### Installation

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/mumairr/ArcJsSDK.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ArcJsSDK
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server and launch the project in your browser:

```bash
npm start
```

Visit `http://localhost:3000/` to explore the application in development mode.

---

## 📦 Usage

This project demonstrates how to integrate **ArcGIS JavaScript SDK** into a **React** application. Below are the key features and how to use them.

### Key Components

1. **Map Rendering**: The application uses the `MapView` from ArcGIS to render and interact with the map.
2. **WMS Layer Integration**: Add WMS layers from a GeoServer or other WMS services.
3. **Feature Layer Filtering**: Apply population filters on a `FeatureLayer` using a slider.
4. **Widgets**: Enhance the map with interactive widgets like Search, Layer List, Measurement Tools, and Coordinate Conversion.
5. **Shapefile Upload**: Dynamically upload and display shapefiles.

### Example: Adding a WMS Layer

```js
const wmsLayer = new WMSLayer({
  url: "http://localhost/geoserver/wms",
  sublayers: [
    {
      name: "ne:world",
      visible: true,
      title: "Countries",
    },
  ],
});
```

To add this WMS layer to the map:

```js
webmap.add(wmsLayer);
```

### Dark/Light Mode Toggle

The application supports theme switching between light and dark mode. The map and UI elements dynamically change based on the selected theme.

To toggle between light and dark mode, use the **DarkModeSwitch** button in the UI.

### Population Filtering

You can adjust the population filter using a slider that controls the visibility of features based on population attributes. The `definitionExpression` property is updated as the user adjusts the slider.

```js
featureLayer.definitionExpression = `POP2000 >= ${minPopulation} AND POP2000 <= ${maxPopulation}`;
```

---

## 🗂️ Shapefile Upload

This application allows users to upload **shapefiles** to dynamically display custom geographic data on the map.

### Steps to Use:

1. **Click the "Upload Shapefile" button** located on the right-hand side of the UI.
2. **Select a `.shp` file** from your local machine.
3. The shapefile will be parsed and displayed on the map as a new layer.

**Shapefile Parsing** is handled using the `shapefile.js` library, which converts the shapefile data to GeoJSON format for rendering on the map.

### Code Snippet for Shapefile Upload:

```js
import { open } from "shapefile";

const handleShapefileUpload = async (file) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const arrayBuffer = e.target.result;
    const source = await open(arrayBuffer);
    
    source.read().then(function log(result) {
      if (result.done) return;
      const feature = result.value;

      const graphic = new Graphic({
        geometry: {
          type: "polygon", // Handle the specific geometry type (e.g., polygon, point, etc.)
          rings: feature.geometry.coordinates,
        },
        symbol: {
          type: "simple-fill",
          color: [51, 51, 204, 0.9],
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        attributes: feature.properties,
      });

      graphicsLayer.add(graphic); // Add the graphic to the map
      source.read().then(log); // Process the next feature
    });
  };

  reader.readAsArrayBuffer(file);
};
```

---

## 🔧 Components

The project consists of several reusable components, including:

- **`MapComponent`**: Core map logic, renders the map and layers.
- **`DarkModeSwitch`**: Toggles between dark and light modes.
- **`Measurement Tools`**: Tools for measuring distances and areas.

These components interact with the ArcGIS API to provide dynamic map interaction.

---

## 👨‍💻 Contributing

Contributions to this project are welcome! Whether it’s fixing bugs, adding new features, or improving documentation, your help is appreciated.

### How to Contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

Thank you for checking out the **ArcGIS JavaScript SDK POC** project! If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/mumairr/ArcJsSDK/issues).

---
