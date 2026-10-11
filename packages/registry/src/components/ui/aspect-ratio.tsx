import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function PixelAspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { PixelAspectRatio };
