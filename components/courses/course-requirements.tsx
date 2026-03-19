import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertCircle } from "lucide-react"

interface CourseRequirementsProps {
  requirements: string[]
  whatYouWillLearn: string[]
}

export function CourseRequirements({ requirements, whatYouWillLearn }: CourseRequirementsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>What you&apos;ll learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {whatYouWillLearn.map((item, index) => (
              <div key={index} className="flex gap-3">
                <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {requirements.map((req, index) => (
              <li key={index} className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-sm">{req}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
