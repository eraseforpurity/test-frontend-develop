import colors from '../../helpers/theme/colors';

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '450px',
    height: 'fit-content',
    bgcolor: 'background.paper',
    border: `2px solid ${colors.border.main}`,
    boxShadow: 24,
    p: '50px'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    mb: '30px'
  },
  saveButton: {
    '&:hover': {
      bgcolor: 'green'
    }
  }
};

export default styles;
