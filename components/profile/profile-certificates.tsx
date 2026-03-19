import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, Share2, ExternalLink } from "lucide-react"

const certificates: any[] = []

export function ProfileCertificates() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {certificates.length > 0 ? (
        certificates.map((cert) => (
          <Card key={cert.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Issued {cert.issueDate}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    ID: {cert.credentialId}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cert.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-10 col-span-full">No certificates earned yet.</p>
      )}
    </div>
  )
}
