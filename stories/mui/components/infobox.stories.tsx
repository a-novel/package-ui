import { InfoBox, MaterialSymbol } from "~/mui/components";
import { SPACINGS } from "~/mui/utils";

import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof InfoBox> = {
  component: InfoBox,
  parameters: {
    layout: "centered",
  },
  args: {
    color: "primary",
  },
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => <InfoBox {...args}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</InfoBox>,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const LongContent: Story = {
  render: (args) => (
    <InfoBox maxWidth="30rem" {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </InfoBox>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="column" gap={SPACINGS.LARGE} padding={SPACINGS.LARGE}>
      <InfoBox color="primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</InfoBox>
      <InfoBox color="secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</InfoBox>
      <InfoBox color="error">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</InfoBox>
      <InfoBox color="success">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</InfoBox>
    </Stack>
  ),
};

export const IconVariants: Story = {
  render: () => (
    <Stack direction="column" gap={SPACINGS.LARGE} padding={SPACINGS.LARGE}>
      <InfoBox icon={<MaterialSymbol icon="info" />} color="primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </InfoBox>
      <InfoBox icon={<MaterialSymbol icon="info" />} color="secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </InfoBox>
      <InfoBox icon={<MaterialSymbol icon="info" />} color="error">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </InfoBox>
      <InfoBox icon={<MaterialSymbol icon="info" />} color="success">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </InfoBox>
    </Stack>
  ),
};
