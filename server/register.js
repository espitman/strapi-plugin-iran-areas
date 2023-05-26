"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "area",
    plugin: "iran-areas",
    type: "string",
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });
};
