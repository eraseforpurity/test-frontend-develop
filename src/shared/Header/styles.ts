import colors from '../../helpers/theme/colors';

const styles = {
  mobile: {
    header: {
      px: 1,
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 501,
      backgroundColor: `${colors.background.default}99`,
      backdropFilter: 'saturate(360%) blur(8px)',
      '> svg': {
        transition: 'transform ease-in-out 0.5s',
        '&:hover': { cursor: 'pointer', transform: 'scale(1.1)' }
      }
    },
    head: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      gap: 1
    },
    slideMenu: {
      border: 0,
      px: 3,
      pb: 3,
      pt: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    menu: {
      gap: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  filler: {
    height: '80px',
    overflow: 'hidden',
    '@media screen and (max-width: 960px)': {
      height: '50px'
    }
  },
  headerWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: `${colors.background.default}dd`,
    backdropFilter: 'saturate(360%) blur(8px)',
    zIndex: 501
  },
  header: {
    height: '80px',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > :first-of-type': {
      display: 'flex',
      gap: 2,
      minHeight: '3rem',
      alignItems: 'center',
      flexWrap: 'wrap',
      '& > :first-of-type': {
        cursor: 'pointer'
      },
      '> svg': {
        transition: 'transform ease-in-out 0.5s',
        '&:hover': { cursor: 'pointer', transform: 'scale(1.05)' }
      }
    },
    '& > :last-of-type': {
      display: 'flex',
      gap: 1,
      minHeight: '3rem',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  },
  activeLink: {
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  link: {
    fontWeight: 'normal'
  }
};

export default styles;
