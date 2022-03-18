import { IFrontbookConfig } from "frontbook-react";
// @ts-ignore
import { loader as styledJSX } from "styled-jsx/webpack";

export default {
  port: 5000,

  title: "Component Conti Page",
  subtitle: "🧤 Component Conti Page",
  description:
    "After checking the component list here, you can create and copy the required component code.",
  mainColor: "#51d4b0",
  docs: {
    "Frontbook Github": "https://github.com/akasia-dev/frontbook",
  },

  componentFolderName: "components",
  ignoreComponents: ["components/next/PrefetchLink"],
  disableDefaultWebpackConfig: false,
  disablePreactInjection: false,
  publicServePaths: ["./public"],
  disableHMR: false,

  webpack: {
    // * Styled JSX + SCSS
    module: {
      rules: [
        {
          test: /\.(eot|woff|woff2|ttf|svg)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "fonts/[hash].[ext]",
            },
          },
        },

        {
          test: /\.(eot|woff|woff2|ttf|svg)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 100000,
              name: "fonts/[hash].[ext]",
              mimetype: "application/font-woff",
            },
          },
        },

        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: styledJSX,
              options: {
                type: "global",
              },
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        },

        {
          test: /\.(css)$/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: styledJSX,
              options: {
                type: "global",
              },
            },
            {
              loader: "css-loader",
            },
          ],
        },
      ],
    },
  },
} as IFrontbookConfig;
