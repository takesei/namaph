import settings from "../../settings/settings.json";
import axios from "axios";

/**
 * Description. gets `props` with geojson
 * and procces the interactive area
 */
export const _proccessGridData = cityioData => {
    let types = settings.map.types;
    const grid = cityioData.grid;
    const geojson = cityioData.meta_grid;
    // update meta_grid features from cityio
    for (let i = 0; i < geojson.features.length; i++) {
        geojson.features[i].properties = cityioData.interactive_grid_data[i];
    }
    // handles interactive mapping of the grid
    // this should only happen once, to remove on future builds
    const interactiveMapping = cityioData.interactive_grid_mapping;
    for (let i in interactiveMapping) {
        geojson.features[interactiveMapping[i]].properties.type = grid[i][0];
        geojson.features[interactiveMapping[i]].properties.color =
            types[grid[i][0]].color;
        geojson.features[interactiveMapping[i]].properties.height =
            types[grid[i][0]].height;
    }
    return geojson;
};

/**
 * Description. gets `props` with geojson
 * and procces the access layer data
 */
export const _proccessAccessData = data => {
    const accessData = data.access;
    // get colors from settings
    let coordinates = accessData.features.map(d => d.geometry.coordinates);
    let values = accessData.features.map(d => d.properties);
    let heatmap = [];
    for (let i = 0; i < coordinates.length; i++) {
        heatmap.push({
            coordinates: coordinates[i],
            values: values[i]
        });
    }
    return heatmap;
};

/**
 * checks if edits are done (toggled off)
 * than returns a redux state
 * with cityIO payload and flag
 */
export const _prepareEditsForCityIO = meta_grid => {
    let arr = [];
    for (let i = 0; i < meta_grid.features.length; i++) {
        arr[i] = meta_grid.features[i].properties;
    }
    _postCityIOgridEdits(arr);
};

/**
 * post grid edit to cityIO
 *
 */
export const _postCityIOgridEdits = data => {
    axios
        .post(
            "https://cityio.media.mit.edu/api/table/update/grasbrook/interactive_grid_data",
            data
        )
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
};
