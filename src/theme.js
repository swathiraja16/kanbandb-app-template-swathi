import { red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const green = '#67b444'
const grey = '#999999'
const lightGrey = '#f3f3f3'
const darkGrey = '#555555'
const darkText = '#767676'
const blackText = '#424242'

// A custom theme for this app
let theme = createMuiTheme({
  palette: {
    primary: {
      main: green,
      contrastText: "#FFFFFF" //button text white instead of black
    },
    secondary: {
      main: '#1e88e5',
    },
    greys: {
			main: grey,
      light: lightGrey,
      dark: darkGrey,
    },
    text: {
      grey: darkText,
      black: blackText,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.1,
  },
  appBar: {
    height: '75px',
    width: '100%',
    padding: '20px',
    boxShadow: '0 1px 10px 5px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
  },
  appBarSelections: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 50px',
    fontSize: '22px',
    fontWeight: 700,
    '&:hover': {
         cursor: 'pointer',
      },
  },
  navigationArrows: {
    color: darkText,
    '&:hover': {
        color: blackText,
        cursor: 'pointer',
      },
  },
  centeredColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: grey,
    fontWeight: 500,
  },
  icon: {
    color: darkGrey,
    "&:hover": {
      cursor: "pointer",
    },
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    margin: "0 10px",
  },
  greenIcon: {
    color: green,
    "&:hover": {
      cursor: "pointer",
    },
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    margin: "0 10px",
  },
  plInput: {
    width: '200px',
    margin: '5px',
  },
  plDetails: {
    width: '470px',
    height: '100%',
    fontWeight: 500,
    color: darkGrey,
    padding: '10px 15px',
    overflowY:'auto',
    overflowX: 'hidden',
  },
  disabledInput: {
    width: '200px',
    margin: '5px',
    display: 'flex',
    padding: '14px',
    border: '3px solid #f5f5f5',
    borderRadius: '5px',
    fontWeight: 400,
    fontSize: '16px',
    color: '#212121',
    backgroundColor: lightGrey,
  },
  select: {
    '&:hover': {
         cursor: 'pointer',
      },
    fontWeight: 500,
    fontSize: 16,
    height: '50px',
    width: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 20px',
  },
  greenSelect: {
		color: green,
		'&:hover': {
		     cursor: 'pointer',
		  },
		fontWeight: 500,
		fontSize: 16,
		height: '50px',
		width: '100px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0 20px',
	},
  buttonBox: {
    width: '100%',
    height: '100%',
    backgroundColor: lightGrey,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  modalHead: {
    width: '100%',
    color: darkGrey,
    fontSize: 20,
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalPaper: {
    position: 'absolute',
    width: '95vw',
    height: '94vh',
    backgroundColor: '#ffffff',
  },
  hiddenOperation: {
    color: grey,
    fontWeight: 500,
    '&:hover': {
        cursor: 'pointer',
    },
  },
  plIcon: {
    color: green,
    '&:hover': {
        cursor: 'pointer',
    },
    fontWeight: 500,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
  },
  addOperation: {
    color: green,
    margin: '20px 0px',
    padding: '10px',
    '&:hover': {
        cursor: 'pointer',
    },
    fontWeight: 500,
    width: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    // backgroundColor: lightGrey,
  },
  tableHeaderText: {
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    fontSize: 16,
    color: blackText,
  },
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    fontWeight: 500,
    color: blackText,
  },
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  greenHover: {
    "&:hover": {
      color: green,
      cursor: "pointer",
    },
  },
  connect: {
    display: 'flex',
    justifyContent: 'center',
    color: green,
    margin: '10px 0px',
    padding: '10px',
    '&:hover': {
        cursor: 'pointer',
    },
    fontWeight: 500,
    fontSize: 18,
    width: '240px',
  },
  mapControls: {
    color: blackText,
    backgroundColor: lightGrey,
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    width: "100%",
    padding: "15px",
    fontWeight: 500,
    fontSize: 14,
  },
  messageBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 32,
    fontWeight: 500,
    color: blackText,
  },
});


theme = responsiveFontSizes(theme);
export default theme;
