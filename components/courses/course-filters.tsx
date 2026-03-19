"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "web-dev", label: "Web Development", count: 245 },
  { id: "data-science", label: "Data Science", count: 189 },
  { id: "mobile", label: "Mobile Development", count: 98 },
  { id: "cloud", label: "Cloud Computing", count: 156 },
  { id: "devops", label: "DevOps", count: 87 },
  { id: "design", label: "UI/UX Design", count: 112 },
]

const levels = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
]

const durations = [
  { id: "short", label: "0-5 hours" },
  { id: "medium", label: "5-15 hours" },
  { id: "long", label: "15-30 hours" },
  { id: "extended", label: "30+ hours" },
]

const ratings = [
  { id: "4.5", label: "4.5 & up" },
  { id: "4.0", label: "4.0 & up" },
  { id: "3.5", label: "3.5 & up" },
]

export function CourseFilters() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])

  const toggleFilter = (
    id: string,
    selected: string[],
    setSelected: (value: string[]) => void
  ) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedLevels([])
    setPriceRange([0, 200])
  }

  const activeFiltersCount =
    selectedCategories.length + selectedLevels.length + (priceRange[1] < 200 ? 1 : 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filters</h2>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["categories", "level", "price"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() =>
                        toggleFilter(category.id, selectedCategories, setSelectedCategories)
                      }
                    />
                    <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                      {category.label}
                    </Label>
                  </div>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level">
          <AccordionTrigger>Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {levels.map((level) => (
                <div key={level.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={level.id}
                    checked={selectedLevels.includes(level.id)}
                    onCheckedChange={() =>
                      toggleFilter(level.id, selectedLevels, setSelectedLevels)
                    }
                  />
                  <Label htmlFor={level.id} className="text-sm font-normal cursor-pointer">
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={200}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration">
          <AccordionTrigger>Duration</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {durations.map((duration) => (
                <div key={duration.id} className="flex items-center space-x-2">
                  <Checkbox id={duration.id} />
                  <Label htmlFor={duration.id} className="text-sm font-normal cursor-pointer">
                    {duration.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {ratings.map((rating) => (
                <div key={rating.id} className="flex items-center space-x-2">
                  <Checkbox id={rating.id} />
                  <Label htmlFor={rating.id} className="text-sm font-normal cursor-pointer">
                    {rating.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
