import colors from '@/helpers/theme/colors';

const styles = {
  position: 'absolute',
  borderRadius: 1,
  top: -1,
  left: -1,
  right: -1,
  bottom: -1,
  background: colors.loading.background,
  backdropFilter: colors.loading.blur,
  zIndex: 11,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default styles;
