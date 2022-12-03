import { Box, Fade, Flex, ScaleFade, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Fade in unmountOnExit>
      <Flex
        zIndex={100}
        align="center"
        justify="center"
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
      >
        <Box
          width="100vw"
          height="100vh"
          pos="absolute"
          top={0}
          left={0}
          bgGradient="linear(to-tr, gray.900, primary.800)"
          border={5}
        />

        <ScaleFade
          in
          initialScale={0.5}
          transition={{
            enter: {
              type: "spring",
              stiffness: 600,
              duration: 2,
            },
            exit: {
              duration: 0.5,
            },
          }}
        >
          <Spinner
            size="xl"
            thickness="0.5rem"
            speed="0.65s"
            emptyColor="gray.800"
            color="primary.100"
          />
        </ScaleFade>
      </Flex>
    </Fade>
  );
};

export default Loader;
