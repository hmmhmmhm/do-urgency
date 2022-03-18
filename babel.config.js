module.exports = process.env.FRONTBOOK
  ? {
      env: {
        development: {
          compact: false,
        },
      },
      plugins: ["styled-jsx/babel"],
    }
  : {
      presets: ["next/babel"],
      env: {
        development: {
          compact: false,
        },
      },
    };
