import { CSSProperties } from 'react';

const styleMap = {
  common: {
    input: {
      paddingLeft: '0.5em',
      paddingRight: '0.5em',
      textAlign: 'right'
    } as CSSProperties,
    lightRightBorderColor: {
      borderRightColor: 'rgba(34, 36, 38, .05)'
    } as CSSProperties,
    noLeftBorder: {
      borderLeft: 'none'
    } as CSSProperties,
    yearInput: {
      width: '3.75em'
    } as CSSProperties
  },
  buttonsInside: {
    outerDiv: {
      display: 'flex'
    } as CSSProperties,
    input: {
      width: '2.5em'
    } as CSSProperties,
    firstInput: {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0
    } as CSSProperties,
    nonFirstInput: {
      borderRadius: 0
    } as CSSProperties,
    button: {
      div: {
        display: 'flex',
        flexDirection: 'column'
      } as CSSProperties,
      base: {
        flex: '0 0 50%',
        minHeight: 'unset',
        margin: 0,
        maxHeight: 'unset',
        padding: '0 0.2em'
      } as CSSProperties,
      nonLast: {
        borderRadius: 0
      } as CSSProperties,
      lastIncrement: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0
      } as CSSProperties,
      lastDecrement: {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      } as CSSProperties
    }
  },
  buttonsOutside: {
    outerDiv: {
      display: 'flex'
    } as CSSProperties,
    input: {
      borderColor: 'rgba(34, 36, 38, .05)',
      borderRadius: 0,
      width: '2.5em'
    } as CSSProperties,
    button: {
      base: {
        minHeight: 'unset',
        margin: 0,
        maxHeight: 'unset'
      } as CSSProperties,
      increment: {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0
      } as CSSProperties,
      decrement: {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
      } as CSSProperties
    }
  }
};

export default styleMap;
