"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2, Search } from "lucide-react"

export function SearchFormClient({ onSearch, isLoading }: { onSearch: (term: string) => void, isLoading: boolean }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    if (searchTerm.trim()) onSearch(searchTerm)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div className="relative flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Busca por curso..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-4 py-2"
      />
      <div className="absolute left-3 text-gray-500">
        <Search size={18} />
      </div>
      <Button
        variant="default"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Buscar"}
      </Button>
    </div>
  )
}
