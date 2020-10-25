import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const signPagesInputErrorCustomStyle = createMuiTheme({
    overrides: {
      MuiFormHelperText: {
        root: {
          position: "absolute",
          marginLeft: '5px',
          top: "100%"
        },
      },
      MuiTextField: {
        root: {
          marginBottom: '15px'
        }
      }
    },
  });

export default {signPagesInputErrorCustomStyle}