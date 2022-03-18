const styledJSX = require(`styled-jsx/webpack`).loader;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  webpack: (config, { dev, defaultLoaders }) => {
    // * 개발 중 사용될 웹팩 설정입니다.
    if (dev) {
      // * HMR 시 CPU 사용량을 줄이는 빌드 최적화 코드입니다.
      config.watchOptions.poll = 1000;
      config.watchOptions.aggregateTimeout = 300;
    }

    // * URL Loader 를 활성화합니다.
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "fonts/[hash].[ext]",
        },
      },
    });

    // * URL Loader 를 활성화합니다.
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "fonts/[hash].[ext]",
          mimetype: "application/font-woff",
        },
      },
    });

    // * Styled JSX 에 맞게끔 css 와 scss 를 불러옵니다.
    config.module.rules.push({
      test: /\.(scss|sass)$/,
      use: [
        defaultLoaders.babel,
        {
          loader: styledJSX,
          options: {
            type: (_, options) => {
              return options.query.type || "global";
            },
          },
        },
        {
          loader: "postcss-loader",
        },
        {
          loader: "sass-loader",
        },
      ],
    });

    config.module.rules.push({
      test: /\.(css)$/,
      use: [
        defaultLoaders.babel,
        {
          loader: styledJSX,
          options: {
            type: (_, options) => {
              return options.query.type || "global";
            },
          },
        },
        {
          loader: "css-loader",
        },
      ],
    });
    return config;
  },
};
