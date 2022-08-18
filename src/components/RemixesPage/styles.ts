import colors from '@/helpers/theme/colors';

export const styles = {
  container: { display: 'flex', flexDirection: 'column', hieght: '100%', marginTop: '100px' },
  tableContainer: { border: `1px solid ${colors.border.inverted}` },
  table: {
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
  }
};
