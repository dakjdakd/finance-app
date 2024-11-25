import { BudgetItem } from "@/types"

interface BudgetItemProps {
  item: BudgetItem
}

export function BudgetItemCard({ item }: BudgetItemProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="h-10 w-10 rounded-lg"
            style={{ backgroundColor: item.color }}
          />
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500">
              ${item.amountLeft} left
            </p>
          </div>
        </div>
        <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
      </div>
    </div>
  )
}

