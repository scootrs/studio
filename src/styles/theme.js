const backgrounds = {
  light: {
    main: '#ffffff',
    dark: '#373737',
    medium: '#575757',
    light: '#efefef'
  },
  dark: {
    main: '#222222',
    dark: '#020202',
    medium: '#141414',
    light: '#444444'
  }
};

const fonts = {
  light: {
    main: '#010101',
    inverse: '#fefefe'
  },
  dark: {
    main: '#fefefe',
    inverse: '#010101'
  }
};

const theme = function(mode) {
  return {
    colors: {
      primary: {
        main: '#523E8E',
        light: '#715FA8',
        medium: '#3C2879',
        dark: '#26135E'
      },
      secondary: {
        main: '#CFA44B',
        light: '#F4Cd7C',
        medium: '#AF842B',
        dark: '#89610E',
      },
      alerts: {
        warning: '#AF842B'
      },
      fonts: {
        ...fonts[mode]
      },
      backgrounds: {
        ...backgrounds[mode]
      }
    },
    fonts: {
      main: 'Ubuntu,Droid Sans,sans-serif',
      sizes: {
        title: '1.7em',
        subtitle: '1.4em',
        heading: '1.2em',
        text: '1em',
        small: '0.7em'
      }
    },
    spacing: {
      small: '5px',
      medium: '10px',
      large: '16px'
    }
  };
};

export default theme('light');
