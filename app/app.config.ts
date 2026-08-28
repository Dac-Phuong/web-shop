export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      neutral: "slate",
    },
    button: {
      slots: {
        base: [
          "rounded-2xl",
          "font-medium",
          "cursor-pointer",
          "inline-flex items-center justify-center",
          "h-[40px] px-4",
          "disabled:cursor-not-allowed",
          "aria-disabled:cursor-not-allowed",
          "disabled:opacity-75",
          "aria-disabled:opacity-75",
          "transition-all duration-200",
        ],
      },
    },

    input: {
      slots: {
        root: "relative inline-flex items-center w-full",
        base: [
          "w-full",
          "h-[42px]",
          "px-4",
          "rounded-2xl",
          "border-0",
          "appearance-none",
          "placeholder:text-dimmed",
          "focus:outline-none",
          "disabled:cursor-not-allowed",
          "disabled:opacity-75",
          "transition-all duration-200",
        ],
      },
    },
    select: {
      slots: {
        root: "relative inline-flex items-center w-full",
        base: [
          "w-full",
          "h-[42px]",
          "px-4",
          "rounded-2xl",
          "border-0",
          "appearance-none",
          "placeholder:text-dimmed",
          "focus:outline-none",
          "disabled:cursor-not-allowed",
          "disabled:opacity-75",
          "transition-all duration-200",
        ],
      },
    },
    selectMenu: {
      slots: {
        base: [
          "relative group rounded-2xl inline-flex h-[42px] items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors",
        ],
        content: "bg-white rounded-2xl shadow-lg ",
        
      },
    },
    textarea: {
      slots: {
        root: "relative inline-flex items-center w-full",
        base: [
          "w-full",
          "px-4 py-2",
          "rounded-2xl",
          "border-0",
          "appearance-none",
          "placeholder:text-dimmed",
          "focus:outline-none",
          "disabled:cursor-not-allowed",
          "disabled:opacity-75",
          "transition-all duration-200",
        ],
      },
    },
    pagination: {
      slots: {
        item: [
          "w-9 h-9",
          "rounded-full",
          "flex items-center justify-center",
          "text-sm",
          "aria-current:bg-primary aria-current:text-white",
          "hover:bg-gray-200",
          "disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors duration-200",
        ],
        previous: "w-9 h-9 rounded-full flex items-center justify-center text-sm hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200",
        next: "w-9 h-9 rounded-full flex items-center justify-center text-sm hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200",
        last: "w-9 h-9 rounded-full flex items-center justify-center text-sm hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200",
        first: "w-9 h-9 rounded-full flex items-center justify-center text-sm hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200",
      },
    },
    slideover: {
      slots: {
        overlay: 'fixed inset-0 bg-elevated/75',
        content: 'fixed bg-default divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none',
        header: 'flex items-center gap-1.5 p-4 sm:px-6 min-h-(--ui-header-height)',
        wrapper: '',
        body: 'flex-1 overflow-y-auto p-4 sm:p-6',
        footer: 'flex items-center gap-1.5 p-4 sm:px-6',
        title: 'text-highlighted font-semibold',
        description: 'mt-1 text-muted text-sm',
        close: 'absolute top-4 end-4'
      }
      },
  },
});
