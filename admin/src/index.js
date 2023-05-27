import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
    app.customFields.register({
      name: "area",
      pluginId: "iran-areas", // the custom field is created by a iran-areas plugin
      type: "json", // the area will be stored as a json
      intlLabel: {
        id: "iran-areas.area.label",
        defaultMessage: "area",
      },
      intlDescription: {
        id: "iran-areas.area.description",
        defaultMessage: "Select any area",
      },
      icon: PluginIcon, // don't forget to create/import your icon component
      components: {
        Input: async () => import("./components/Input"),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.requiredField",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "form.attribute.item.requiredField.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
        // declare options here
      },
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
