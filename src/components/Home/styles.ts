import colors from '@/helpers/theme/colors';

const styles = {
  video: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    img: {
      width: '100%',
      height: '60vh',
      objectFit: 'cover',
      opacity: '1'
    },
    video: {
      width: '100%',
      height: '80vh',
      objectFit: 'cover',
      zIndex: -1,
      backgroundColor: colors.background1
    }
  },
  text: {
    position: 'absolute',
    color: colors.font.inverted,
    fontWeight: 'bold',
    textShadow: '0px 4px 12px rgba(255, 255, 255, 1)'
  },
  hero: {
    backgroundColor: colors.background1,
    color: colors.font.inverted,
    my: 15
  },
  benefitsBackground: {
    backgroundColor: colors.background1,
    color: colors.font.inverted
  },
  benefits: {
    pt: 7,
    pb: 5,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& > div': {
      maxWidth: '300px'
    }
  },
  button1: {
    px: 6,
    py: 2,
    boxShadow: colors.boxShadow,
    borderRadius: 2
  },
  centered: {
    display: 'flex',
    justifyContent: 'center'
  }
};

export default styles;
