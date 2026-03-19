"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Check, 
  X, 
  Clock, 
  Terminal, 
  ChevronRight, 
  Plus,
  Play
} from "lucide-react"

interface TestCase {
  id: number
  input: string
  expected: string
  actual?: string
  status: "pending" | "running" | "passed" | "failed"
  runtime?: string
}

const defaultTestCases: TestCase[] = [
  {
    id: 1,
    input: "nums = [2,7,11,15], target = 9",
    expected: "[0,1]",
    status: "pending",
  },
  {
    id: 2,
    input: "nums = [3,2,4], target = 6",
    expected: "[1,2]",
    status: "pending",
  },
  {
    id: 3,
    input: "nums = [3,3], target = 6",
    expected: "[0,1]",
    status: "pending",
  },
]

export function TestResults() {
  const [activeTab, setActiveTab] = useState("testcases")
  const [testCases, setTestCases] = useState<TestCase[]>(defaultTestCases)
  const [selectedCase, setSelectedCase] = useState(1)
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])

  const runTests = () => {
    // Simulate running tests
    setTestCases((prev) =>
      prev.map((tc) => ({ ...tc, status: "running" as const }))
    )

    setTimeout(() => {
      setTestCases([
        {
          ...defaultTestCases[0],
          status: "passed",
          actual: "[0,1]",
          runtime: "52ms",
        },
        {
          ...defaultTestCases[1],
          status: "passed",
          actual: "[1,2]",
          runtime: "48ms",
        },
        {
          ...defaultTestCases[2],
          status: "failed",
          actual: "[0,0]",
          runtime: "45ms",
        },
      ])
      setConsoleOutput([
        "> Running test case 1...",
        "> Test case 1 passed",
        "> Running test case 2...",
        "> Test case 2 passed",
        "> Running test case 3...",
        "> Expected [0,1] but got [0,0]",
        "> Test case 3 failed",
      ])
    }, 1500)
  }

  const selectedTestCase = testCases.find((tc) => tc.id === selectedCase)

  const getStatusIcon = (status: TestCase["status"]) => {
    switch (status) {
      case "passed":
        return <Check className="h-4 w-4 text-emerald-500" />
      case "failed":
        return <X className="h-4 w-4 text-rose-500" />
      case "running":
        return <Clock className="h-4 w-4 animate-spin text-amber-500" />
      default:
        return <span className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
    }
  }

  return (
    <div className="flex h-full flex-col bg-card">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-4">
          <TabsList className="h-10 w-auto justify-start gap-4 rounded-none bg-transparent p-0">
            <TabsTrigger
              value="testcases"
              className="h-10 rounded-none border-b-2 border-transparent px-0 text-sm data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Test Cases
            </TabsTrigger>
            <TabsTrigger
              value="result"
              className="h-10 rounded-none border-b-2 border-transparent px-0 text-sm data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Test Result
            </TabsTrigger>
            <TabsTrigger
              value="console"
              className="h-10 rounded-none border-b-2 border-transparent px-0 text-sm data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Console
            </TabsTrigger>
          </TabsList>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={runTests}>
            <Play className="h-3.5 w-3.5" />
            Run Tests
          </Button>
        </div>

        <TabsContent value="testcases" className="mt-0 flex-1 overflow-hidden">
          <div className="flex h-full">
            <div className="flex w-48 flex-col border-r">
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {testCases.map((tc) => (
                    <button
                      key={tc.id}
                      onClick={() => setSelectedCase(tc.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted/50",
                        selectedCase === tc.id && "bg-muted"
                      )}
                    >
                      {getStatusIcon(tc.status)}
                      <span>Case {tc.id}</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t p-2">
                <Button variant="ghost" size="sm" className="w-full gap-1.5">
                  <Plus className="h-4 w-4" />
                  Add Case
                </Button>
              </div>
            </div>

            <div className="flex-1 p-4">
              {selectedTestCase && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Input
                    </label>
                    <div className="rounded-md bg-muted/50 p-3 font-mono text-sm">
                      {selectedTestCase.input}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Expected Output
                    </label>
                    <div className="rounded-md bg-muted/50 p-3 font-mono text-sm">
                      {selectedTestCase.expected}
                    </div>
                  </div>
                  {selectedTestCase.actual && (
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                        Actual Output
                      </label>
                      <div
                        className={cn(
                          "rounded-md p-3 font-mono text-sm",
                          selectedTestCase.status === "passed"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        )}
                      >
                        {selectedTestCase.actual}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="result" className="mt-0 flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              {testCases.some((tc) => tc.actual) ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {testCases.every((tc) => tc.status === "passed") ? (
                      <>
                        <Check className="h-5 w-5 text-emerald-500" />
                        <span className="font-medium text-emerald-600">
                          All test cases passed
                        </span>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 text-rose-500" />
                        <span className="font-medium text-rose-600">
                          {testCases.filter((tc) => tc.status === "failed").length} test
                          case(s) failed
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Runtime: {testCases[0]?.runtime || "N/A"}
                  </div>
                  <div className="space-y-2">
                    {testCases.map((tc) => (
                      <div
                        key={tc.id}
                        className="flex items-center justify-between rounded-md border p-3"
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(tc.status)}
                          <span className="text-sm">Test Case {tc.id}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {tc.runtime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Run your code to see results
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="console" className="mt-0 flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              {consoleOutput.length > 0 ? (
                <div className="space-y-1 font-mono text-sm">
                  {consoleOutput.map((line, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-start gap-2",
                        line.includes("failed") && "text-rose-500",
                        line.includes("passed") && "text-emerald-500"
                      )}
                    >
                      <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Console output will appear here
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
