"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  RotateCcw, 
  Settings2, 
  Copy, 
  Expand, 
  Minimize2,
  Code2,
  FileCode,
  Check
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface CodeEditorProps {
  problemId: string
}

const starterCode: Record<string, Record<string, string>> = {
  "two-sum": {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
    
};`,
    typescript: `function twoSum(nums: number[], target: number): number[] {
    // Your code here
    
};`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
  },
  "add-two-numbers": {
    javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // Your code here
    
};`,
    typescript: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    // Your code here
    
};`,
    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Your code here
        pass`,
  },
}

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
]

export function CodeEditor({ problemId }: CodeEditorProps) {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(
    starterCode[problemId]?.[language] || starterCode["two-sum"][language]
  )
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCode(starterCode[problemId]?.[language] || starterCode["two-sum"][language])
  }, [problemId, language])

  const handleReset = () => {
    setCode(starterCode[problemId]?.[language] || starterCode["two-sum"][language])
    toast.success("Code reset to default")
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success("Code copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    toast.info(`Switched to ${languages.find(l => l.value === newLanguage)?.label}`)
  }

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Code</span>
          </div>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="text-xs">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleReset}
            title="Reset to default code"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Font Size</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setFontSize(12)}>
                Small (12px)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize(14)}>
                Medium (14px)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize(16)}>
                Large (16px)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Tab Size</DropdownMenuLabel>
              <DropdownMenuItem>2 spaces</DropdownMenuItem>
              <DropdownMenuItem>4 spaces</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Expand className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-full w-full resize-none bg-muted/30 p-4 font-mono focus:outline-none"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
          spellCheck={false}
        />
      </div>

      <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-2">
          <FileCode className="h-3.5 w-3.5" />
          <span className="capitalize">{language}</span>
        </div>
      </div>
    </div>
  )
}
