"use client"

import { useState } from "react"
import { ProblemsSidebar } from "@/components/practice/problems-sidebar"
import { CodeEditor } from "@/components/practice/code-editor"
import { ProblemDescription } from "@/components/practice/problem-description"
import { TestResults } from "@/components/practice/test-results"
import { PracticeHeader } from "@/components/practice/practice-header"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function PracticePage() {
  const [selectedProblem, setSelectedProblem] = useState("two-sum")
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className="flex h-screen flex-col bg-background">
      <PracticeHeader 
        showSidebar={showSidebar} 
        onToggleSidebar={() => setShowSidebar(!showSidebar)} 
      />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <ProblemsSidebar
            selectedProblem={selectedProblem}
            onSelectProblem={setSelectedProblem}
          />
        )}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={40} minSize={30}>
            <ProblemDescription problemId={selectedProblem} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="flex h-full flex-col">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={70} minSize={30}>
                  <CodeEditor problemId={selectedProblem} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={20}>
                  <TestResults />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
