import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

interface Props {
    post: any
    type?: string
};

const RecipeReviewCard = ({post, type = "posts"}: Props) => {

  const postDate = type === "livefeed" ? post.expiration_time : post.creation_time;
  const displayDate = new Date(postDate);
  const dateWithoutTime = displayDate.getUTCFullYear() + '-' + (displayDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + displayDate.getUTCDate().toString().padStart(2, '0');
  const timeWithoutDate = displayDate.getUTCHours().toString().padStart(2, '0') + ':' + displayDate.getUTCMinutes().toString().padStart(2, '0') + ':' + displayDate.getUTCSeconds().toString().padStart(2, '0');

  return (

    <Link to={`/post/${post.pid}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ bgcolor: "#b78fd6", minHeight: '500px' }}>
        <CardMedia
          component="img"
          height="250"
          image={"https://kehilabucket.s3.amazonaws.com/" + post.pid}
          alt=""
        />
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={ type === "livefeed" ? "Expires at " + dateWithoutTime + ", " + timeWithoutDate : "Created at " + dateWithoutTime + ", " + timeWithoutDate }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
};

export default RecipeReviewCard;