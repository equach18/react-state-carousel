import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

// Smoke test
it("renders without crashing", () => {
  const currCard = TEST_IMAGES[1];
  render(
    <Card
      caption={currCard.caption}
      src={currCard.src}
      currNum={1}
      totalNum={TEST_IMAGES.length}
    />
  );
});

// Snapshot testing
it("matches snapshot", () => {
  const currCard = TEST_IMAGES[1];

  const { asFragment } = render(
    <Card
      caption={currCard.caption}
      src={currCard.src}
      currNum={1}
      totalNum={TEST_IMAGES.length}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
