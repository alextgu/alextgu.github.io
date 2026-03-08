"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const AvatarContext = React.createContext<{
  imageError: boolean;
  setImageError: (v: boolean) => void;
} | null>(null);

function useAvatar() {
  const ctx = React.useContext(AvatarContext);
  if (!ctx) return { imageError: false, setImageError: () => {} };
  return ctx;
}

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [imageError, setImageError] = React.useState(false);
  return (
    <AvatarContext.Provider value={{ imageError, setImageError }}>
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AvatarContext.Provider>
  );
});
Avatar.displayName = "Avatar";

interface AvatarImageProps extends React.ComponentProps<typeof Image> {
  alt: string;
}

const AvatarImage = React.forwardRef<HTMLDivElement, AvatarImageProps>(
  ({ className, src, alt, onError, ...props }, ref) => {
    const { imageError, setImageError } = useAvatar();
    const handleError = React.useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setImageError(true);
        onError?.(e);
      },
      [setImageError, onError]
    );
    if (imageError) return null;
    return (
      <div ref={ref} className="absolute inset-0 size-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("aspect-square size-full object-cover", className)}
          onError={handleError}
          {...props}
        />
      </div>
    );
  }
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { imageError } = useAvatar();
  if (!imageError) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 flex size-full items-center justify-center rounded-full bg-muted font-medium",
        className
      )}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
