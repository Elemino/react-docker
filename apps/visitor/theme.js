import { jss } from 'react-jss';
import reset from 'jss-reset';
import createMuiTheme from 'material-ui/styles/createMuiTheme';

jss.createStyleSheet(reset).attach();

jss.createStyleSheet({
    '@global html, body': {
        fontFamily: 'Verdana',
    },
}).attach();

export const settings = {};
export const colors = {};

const theme = createMuiTheme({ settings, colors });

export default theme;