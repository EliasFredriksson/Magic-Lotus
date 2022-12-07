import { Box, Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import NAVBAR_CONFIGS from "../../constants/NAVBAR_CONFIG";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box backgroundColor="primary.500" p="m">
      <Stack direction="row" gap="m">
        {NAVBAR_CONFIGS.default.map((link) => (
          <Button
            size="md"
            key={link.to}
            onClick={() => {
              navigate(link.to);
            }}
          >
            {link.text}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Navbar;
