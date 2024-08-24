# ArcGIS JavaScript SDK POC

Welcome to the **ArcGIS JavaScript SDK POC** repository! This project demonstrates the integration and usage of the ArcGIS JavaScript SDK to create interactive maps and geospatial tools within a React application.

### Live Demo
Check out the live demo of the project: [**Live Demo**](https://esri-javascript-sdk-poc.web.app/)

## Features
- **Map Rendering**: Displays an interactive map using the ArcGIS JavaScript SDK.
- **WMS Layer**: Integrates a WMS layer (Web Map Service) for rendering GeoServer-based maps.
- **Feature Layer**: Displays data from a feature service, including dynamic filtering and querying.
- **Interactive Widgets**:
  - **Search Widget**: Allows users to search for locations.
  - **Layer List Widget**: Enables toggling between different map layers.
  - **Measurement Tools**: Provides distance and area measurement tools.
  - **Coordinate Conversion**: Displays pointer coordinates in multiple formats.
- **Dark/Light Mode**: Toggle between dark and light modes, dynamically updating both the map theme and UI styles.
- **Population Filtering**: Slider-based filtering of feature layers based on population attributes.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites
- **Node.js** and **npm** are required to run the project locally.
- An ArcGIS Developer account for accessing ArcGIS online services.

### Installation
To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/mumairr/ArcJsSDK.git
    ```

2. Navigate into the project directory:
    ```bash
    cd ArcJsSDK
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Project
Once the dependencies are installed, you can run the project locally using:

```bash
npm start
```

This will start a development server and open the project in your default browser.

### Building for Production
To create a production build, run the following command:

```bash
npm run build
```

This will create an optimized build of the app in the `build/` directory, ready to be deployed.

## Usage
This project demonstrates how to integrate the ArcGIS JavaScript SDK into a React-based application. Below are some key components and features used in the project:

### Key Components
1. **ArcGIS MapView**: Core component to render the map and manage user interaction.
2. **WMS Layer**: Adds layers from GeoServer via the Web Map Service protocol.
3. **Feature Layer**: Displays features from a REST service with filtering capabilities.
4. **Widgets**:
   - **Search**: Allows users to search for locations.
   - **Layer List**: Toggle between different layers on the map.
   - **Measurement**: Provides distance and area measurement tools.
   - **Coordinate Conversion**: Displays the coordinates of the mouse pointer in different formats.
   
### Example: Adding a Layer
Here’s how you can add a WMS layer to the map:

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

You can add this layer to the WebMap object:

```js
webmap.add(wmsLayer);
```

## Components
The main components of the project include:

- **`MapComponent`**: Responsible for rendering the map, layers, and widgets.
- **`DarkModeSwitch`**: Allows users to toggle between dark and light modes for both the UI and the map.
- **`Measurement Tools`**: Provides distance and area measurement capabilities for users to interact with the map.

### Adding New Layers
To add a new layer, simply import and create an instance of the `FeatureLayer` or `WMSLayer` class and add it to the `WebMap` instance.

### Population Filtering
This project includes a population filtering slider that allows users to filter map features based on population attributes. You can modify the filter by updating the `definitionExpression` property of the `FeatureLayer`.

```js
featureLayer.definitionExpression = `POP2000 >= ${minPopulation} AND POP2000 <= ${maxPopulation}`;
```

## Contributing
Contributions are welcome! If you’d like to contribute to this project, feel free to submit issues or pull requests on the [GitHub repository](https://github.com/mumairr/ArcJsSDK).

### To Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with detailed information on your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Thank you for using and contributing to this project! If you have any questions or issues, feel free to [open an issue](https://github.com/mumairr/ArcJsSDK/issues) on GitHub.