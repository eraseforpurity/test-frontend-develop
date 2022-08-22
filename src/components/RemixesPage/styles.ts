import colors from '../../helpers/theme/colors';
import theme from '../../helpers/theme/theme';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginTop: '100px'
  },
  tableContainer: {
    border: `1px solid ${colors.border.inverted}`,
    minHeight: '785px',
    ['@media (max-width:1200px)']: { minHeight: '1200px' }
  },
  tableContainerOnFetch: {
    minHeight: '785px',
    ['@media (max-width:1200px)']: { minHeight: '1200px' },
    border: `1px solid ${colors.border.inverted}`,
    filter: 'blur(2px) opacity(0.5)',
    useSelect: 'none',
    pointerEvents: 'none'
  },
  table: {
    position: 'relative',
    minWidth: 650,
    th: {
      fontSize: '14px',
      fontWeight: '600'
    },
    td: {
      fontSize: '14px'
    }
  },
  editButton: {
    mr: '10px',
    '&:hover': {
      bgcolor: 'green'
    },
    mb: '5px'
  },

  deleteButton: {
    '&:hover': { bgcolor: 'red' },
    mb: '5px'
  },
  paginationContainer: {
    mt: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};
