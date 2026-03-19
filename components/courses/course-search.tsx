"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function CourseSearch() {
  const [query, setQuery] = useState("")

  return (
    <div className="flex gap-2 max-w-xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for courses, topics, or instructors..."
          className="pl-10 h-11"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button size="lg" className="h-11">
        Search
      </Button>
    </div>
  )
}
