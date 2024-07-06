
// import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard({ name, time ,image }) {
  return (
    <Card  className='card'>
      <CardMedia
        component="img"
        alt="green iguana"
        height="220"
     
        image= {image}
      
      />
      <CardContent>
        <h2>
          {name}
        </h2>
        <Typography variant="h6" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ImgMediaCard.propTypes = {
//   name: PropTypes.string,
//   time: PropTypes.number,
//   image: PropTypes.image,
// };
