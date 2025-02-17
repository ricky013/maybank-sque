import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

interface IInputSearch {
  search: string
  placeholder?: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputSearch = ({ search, handleSearchChange, placeholder }: IInputSearch) => {
  return (
    <div className="w-full relative">
      <Input
        placeholder={placeholder || 'Search'}
        className="w-full pe-5 placeholder:line-clamp-1"
        value={search}
        onChange={handleSearchChange}
      />
      <SearchIcon className="absolute w-5 h-5 top-2 right-2" />
    </div>
  )
}

export default InputSearch
