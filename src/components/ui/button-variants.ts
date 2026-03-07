import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600/20 dark:bg-red-700 dark:focus-visible:ring-red-600/40",
        outline:
          "border border-green-200 bg-white text-green-700 hover:bg-green-50 hover:border-green-300 dark:border-green-800 dark:bg-green-950/20 dark:text-green-400 dark:hover:bg-green-950/40",
        secondary:
          "bg-emerald-100 text-emerald-900 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-100",
        ghost:
          "hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-950/50 dark:hover:text-green-400",
        link: "text-green-600 underline-offset-4 hover:underline dark:text-green-400",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
