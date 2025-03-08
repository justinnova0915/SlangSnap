import { Platform } from 'react-native';

export const fonts = {
  righteous: 'Righteous',
  permanentMarker: 'PermanentMarker',
};

export const typography = {
  zoomer: {
    logo: {
      main: {
        fontFamily: fonts.righteous,
        fontSize: 48,
        fontWeight: '800',
        letterSpacing: -1,
      },
      snap: {
        fontFamily: fonts.permanentMarker,
        fontSize: 48,
        fontWeight: '800',
        letterSpacing: 0.5,
      },
    },
    heading: {
      large: {
        fontFamily: fonts.righteous,
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 0.5,
      },
      medium: {
        fontFamily: fonts.righteous,
        fontSize: 24,
        fontWeight: 'bold',
      },
      small: {
        fontFamily: fonts.righteous,
        fontSize: 20,
        fontWeight: 'bold',
      },
    },
    body: {
      large: {
        fontSize: 18,
        fontWeight: '500',
      },
      regular: {
        fontSize: 16,
        fontWeight: '400',
      },
      small: {
        fontSize: 14,
        fontWeight: '400',
      },
    },
    button: {
      large: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
      },
      regular: {
        fontSize: 16,
        fontWeight: '600',
      },
    },
  },
  classic: {
    logo: {
      main: {
        fontFamily: fonts.righteous,
        fontSize: 44,
        fontWeight: 'bold',
        letterSpacing: -0.5,
      },
      snap: {
        fontFamily: fonts.permanentMarker,
        fontSize: 44,
        fontWeight: 'bold',
      },
    },
    heading: {
      large: {
        fontFamily: fonts.righteous,
        fontSize: 30,
        fontWeight: '600',
        letterSpacing: 0.25,
      },
      medium: {
        fontFamily: fonts.righteous,
        fontSize: 22,
        fontWeight: '600',
      },
      small: {
        fontFamily: fonts.righteous,
        fontSize: 18,
        fontWeight: '600',
      },
    },
    body: {
      large: {
        fontSize: 17,
        fontWeight: '500',
      },
      regular: {
        fontSize: 15,
        fontWeight: '400',
      },
      small: {
        fontSize: 13,
        fontWeight: '400',
      },
    },
    button: {
      large: {
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.25,
      },
      regular: {
        fontSize: 15,
        fontWeight: '600',
      },
    },
  },
};