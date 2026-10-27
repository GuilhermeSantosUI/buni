import * as React from 'react'
import { cn } from '@/lib/utils'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return <div className="w-full overflow-x-auto"><table className={cn('w-full border-collapse text-left text-sm', className)} {...props} /></div>
}
function TableHeader(props: React.ComponentProps<'thead'>) { return <thead {...props} /> }
function TableBody(props: React.ComponentProps<'tbody'>) { return <tbody {...props} /> }
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr className={cn('border-t border-line align-top', className)} {...props} />
}
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return <th className={cn('label py-3 pr-6 font-medium text-fg-muted', className)} {...props} />
}
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return <td className={cn('py-4 pr-6', className)} {...props} />
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
