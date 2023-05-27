"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "area",
    plugin: "iran-areas",
    type: "json",
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });
};
