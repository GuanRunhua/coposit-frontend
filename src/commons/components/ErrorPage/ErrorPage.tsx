import { Box, Button, Typography } from '@pankod/refine-mui';

type IErrorPageProps = {
  title: string;
  message?: string;
  buttonText: string;
  buttonFn: () => void;
};
export const ErrorPage: React.FC<IErrorPageProps> = (props) => {
  const { title, message, buttonText, buttonFn } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        backgroundColor: '#f44336',
      }}
    >
      <Typography variant='h1' style={{ color: 'white' }}>
        {title}
      </Typography>
      <Typography variant='h6' style={{ color: 'white' }}>
        {message}
      </Typography>
      <Button variant='contained' onClick={buttonFn}>
        {buttonText}
      </Button>
    </Box>
  );
};
