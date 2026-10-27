import { Toaster as Sonner, type ToasterProps } from 'sonner'

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{ classNames: { toast: '!bg-ink !text-white !border-0 !rounded-full !font-display !font-bold !text-sm' } }}
      {...props}
    />
  )
}
