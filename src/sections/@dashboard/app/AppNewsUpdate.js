import { faker } from "@faker-js/faker";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
} from "@mui/material";
// utils
import { mockImgCover } from "../../../utils/mockImages";
//
import Scrollbar from "../../../components/Scrollbar";
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    avatar: mockImgCover(setIndex),
    postedAt: faker.date.soon(),
  };
});

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired,
};

function NewsItem({ value }) {
  const { avatar, title, description, createdAt } = value;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={avatar}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{
          p: 3,
          flexShrink: 0,
          color: "text.secondary",
          textAlign: "right",
        }}
      >
        {typeof value !== "undefined" &&
          formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </Typography>
    </Stack>
  );
}

export default function AppNewsUpdate({ data }) {
  return (
    <Card>
      <CardHeader title="Notifications" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {typeof data !== "undefined" &&
            data
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((item) => <NewsItem key={item.title} value={item} />)}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
