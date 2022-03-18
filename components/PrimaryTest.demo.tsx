import { demo } from "frontbook-react";

export default demo({
  controls: {
    name: {
      type: "string",
      defaultValue: "default name?",
    },
  },
  renderProps: (props) => {
    return { name: props.name };
  },
});
